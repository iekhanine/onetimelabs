#!/usr/bin/env python3
"""Create a scrubbed source ZIP. Refuses to export if suspect secrets are found."""
from pathlib import Path
import fnmatch, subprocess,sys,zipfile
root=Path(__file__).resolve().parents[1]
subprocess.run([sys.executable,str(root/'scripts/check_secrets.py')],cwd=root,check=True)
out=Path(sys.argv[1]) if len(sys.argv)>1 else root.parent/'onetimelabs_safe_export.zip'
exclude_dirs={'.git','.next','.vercel','node_modules','dist','out','coverage','.idea','.vscode'}
blocked=('.env','.env.*','*.pem','*.key','*.p12','*.pfx','*credential*.json','*service-account*.json','*service_account*.json','*secrets*.json','*.zip','*.tar','*.tar.gz')
count=0
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as archive:
 for p in root.rglob('*'):
  if not p.is_file() or p.is_symlink():continue
  rel=p.relative_to(root)
  if any(x in exclude_dirs for x in rel.parts):continue
  if any(fnmatch.fnmatch(part,pat) for part in rel.parts for pat in blocked) and str(rel)!='.env.example':continue
  archive.write(p,rel.as_posix());count+=1
print('Safely exported',count,'files to',out)
