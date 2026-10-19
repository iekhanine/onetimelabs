# OneTime Labs — download real Pexels photos and switch from remote URLs to local files
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$photoDir = Join-Path $root 'public\homepage\photos'
New-Item -ItemType Directory -Force -Path $photoDir | Out-Null
$photos = @(
  @{ Name='hero-architecture.jpg'; Id='30694552'; Width='2560' },
  @{ Name='business-architecture.jpg'; Id='11875897'; Width='1800' },
  @{ Name='software-night-office.jpg'; Id='12837026'; Width='1800' },
  @{ Name='enterprise-boardroom.jpg'; Id='28506813'; Width='2400' }
)
foreach ($photo in $photos) {
  $url = "https://images.pexels.com/photos/$($photo.Id)/pexels-photo-$($photo.Id).jpeg?auto=compress&cs=tinysrgb&w=$($photo.Width)"
  $dest = Join-Path $photoDir $photo.Name
  Write-Host "Downloading $($photo.Name)..."
  Invoke-WebRequest -Uri $url -OutFile $dest -MaximumRedirection 5
  if ((Get-Item $dest).Length -lt 10000) { throw "Download too small: $dest" }
}
$tsxPath = Join-Path $root 'app\page.tsx'
$cssPath = Join-Path $root 'app\home.module.css'
$tsx = Get-Content $tsxPath -Raw
$css = Get-Content $cssPath -Raw
$tsx = $tsx.Replace('https://images.pexels.com/photos/11875897/pexels-photo-11875897.jpeg?auto=compress&cs=tinysrgb&w=1800','/homepage/photos/business-architecture.jpg')
$tsx = $tsx.Replace('https://images.pexels.com/photos/12837026/pexels-photo-12837026.jpeg?auto=compress&cs=tinysrgb&w=1800','/homepage/photos/software-night-office.jpg')
$tsx = $tsx.Replace('https://images.pexels.com/photos/28506813/pexels-photo-28506813.jpeg?auto=compress&cs=tinysrgb&w=1800','/homepage/photos/enterprise-boardroom.jpg')
$css = $css.Replace('https://images.pexels.com/photos/30694552/pexels-photo-30694552.jpeg?auto=compress&cs=tinysrgb&w=2560','/homepage/photos/hero-architecture.jpg')
$css = $css.Replace('https://images.pexels.com/photos/28506813/pexels-photo-28506813.jpeg?auto=compress&cs=tinysrgb&w=2400','/homepage/photos/enterprise-boardroom.jpg')
Set-Content -Path $tsxPath -Value $tsx -Encoding UTF8
Set-Content -Path $cssPath -Value $css -Encoding UTF8
Write-Host 'Done. Real photos are now local and source references have been updated.'
