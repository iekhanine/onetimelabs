#!/usr/bin/env python3
"""Fail closed on likely secrets. Run: python scripts/check_secrets.py [--staged]"""
import os, re, subprocess, sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
patterns=[
 ('private key',re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----')),
 ('github token',re.compile(rb'gh[pousr]_[A-Za-z0-9_]{20,}')),
 ('stripe secret',re.compile(rb'(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}')),
 ('resend api key',re.compile(rb're_[A-Za-z0-9]{20,}')),
 ('supabase service key',re.compile(rb'sb_secret_[A-Za-z0-9_-]{12,}')),
 ('aws access key',re.compile(rb'AKIA[0-9A-Z]{16}')),
 ('generic assigned secret',re.compile(rb'(?i)(?:api[_-]?key|secret[_-]?key|access[_-]?token|refresh[_-]?token|password|private[_-]?key)\s*[:=]\s*["\x27]?([A-Za-z0-9_./+=-]{24,})')),
]
blocked=re.compile(r'(^|/)(?:\.env(?:\..*)?|.*\.(?:pem|p12|pfx|key)|.*(?:credentials|service-account|service_account|secrets)\.json)$',re.I)
skips={'.git','node_modules','.next','.vercel','dist','out','coverage'}
scan_ext={'.ts','.tsx','.js','.jsx','.mjs','.cjs','.json','.yaml','.yml','.md','.txt','.sh','.ps1','.py','.env','.toml','.html','.xml','.properties'}
findings=[]
def inspect(name,data):
 if blocked.search(name) and not name.endswith('.env.example'):
  findings.append((name,'sensitive filename'))
 if len(data)>2_000_000:return
 for label,rx in patterns:
  if label=='generic assigned secret':
   for match in rx.finditer(data):
    if match.group(1).startswith((b'process.env.',b'import.meta.env.',b'os.environ.')):continue
    findings.append((name,label))
  elif rx.search(data): findings.append((name,label))
if '--staged' in sys.argv:
 r=subprocess.run(['git','diff','--cached','--name-only','--diff-filter=ACM','-z'],cwd=root,stdout=subprocess.PIPE,check=True)
 for raw in r.stdout.split(b'\0'):
  if not raw:continue
  name=raw.decode('utf-8','replace')
  obj=subprocess.run(['git','show',':'+name],cwd=root,stdout=subprocess.PIPE)
  if obj.returncode==0:inspect(name,obj.stdout)
else:
 for base,dirs,files in os.walk(root):
  dirs[:]=[d for d in dirs if d not in skips]
  for f in files:
   p=Path(base)/f;relative=p.relative_to(root).as_posix()
   if p.suffix.lower() not in scan_ext and not blocked.search(relative):continue
   if p.is_symlink():continue
   inspect(relative,p.read_bytes())
if findings:
 print('SECRET SAFETY CHECK FAILED. No values displayed:')
 for name,label in sorted(set(findings)):print(f' - {name}: {label}')
 print('Remove secrets, rotate exposed credentials, and try again.')
 sys.exit(1)
print('Secret safety check passed (heuristic scan; not a guarantee).')
