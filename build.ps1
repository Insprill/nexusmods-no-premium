# Variables
$zipNameFirefox = "Firefox.zip"
$zipNameChromium = "Chromium.zip"
$sourceFolder = Get-Location
$tempFolder = Join-Path $sourceFolder "temp"
$manifestFileFirefox = Join-Path $sourceFolder "manifest.json"
$manifestFileChromium = Join-Path $sourceFolder "manifest v3.json"
$scriptFile = Join-Path $sourceFolder "nopremium.js"

# Ensure the temp folder is clean
if (Test-Path $tempFolder) {
    Remove-Item -Recurse -Force $tempFolder
}
New-Item -ItemType Directory -Path $tempFolder

# Function to read and update manifest content
function Update-Manifest {
    param (
        [string]$manifestFile,
        [hashtable]$newData,
        [string]$filePath
    )

    $manifestContent = Get-Content -Raw -Path $manifestFile | ConvertFrom-Json

    foreach ($key in $newData.Keys) {
        $manifestContent.$key = $newData.$key
    }

    $manifestContent | ConvertTo-Json -Depth 10 -Compress | Out-File -Encoding utf8 $filePath
}

# Load Firefox manifest
$manifestFirefox = Get-Content -Raw -Path $manifestFileFirefox | ConvertFrom-Json

# Copy files and create Firefox manifest
Write-Host "Copying files to the temp directory..."
Copy-Item -Path $scriptFile -Destination $tempFolder
Update-Manifest -manifestFile $manifestFileFirefox -newData @{} -filePath (Join-Path $tempFolder "manifest.json")

# Create Firefox zip
Write-Host "Creating Firefox zip folder..."
Compress-Archive -Path "$tempFolder\*" -DestinationPath "$sourceFolder\$zipNameFirefox" -Update
Write-Host "Firefox zip folder created successfully."

# Clean temp folder
Remove-Item -Recurse -Force $tempFolder
New-Item -ItemType Directory -Path $tempFolder

# Load Chromium manifest
$manifestChromium = Get-Content -Raw -Path $manifestFileChromium | ConvertFrom-Json

# Copy files and update Chromium manifest
Write-Host "Preparing files for Chromium zip..."
Copy-Item -Path $scriptFile -Destination $tempFolder

# Transplant relevant data
$relevantData = @{
    "name" = $manifestFirefox.name
    "version" = $manifestFirefox.version
    "description" = $manifestFirefox.description
    "content_scripts" = $manifestFirefox.content_scripts
}
Update-Manifest -manifestFile $manifestFileChromium -newData $relevantData -filePath (Join-Path $tempFolder "manifest.json")

# Create Chromium zip
Write-Host "Creating Chromium zip folder..."
Compress-Archive -Path "$tempFolder\*" -DestinationPath "$sourceFolder\$zipNameChromium" -Update
Write-Host "Chromium zip folder created successfully."

# Cleanup
Remove-Item -Recurse -Force $tempFolder

Write-Host "All operations completed successfully."
pause
