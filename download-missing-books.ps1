# Download book covers for updated book list
$outputDir = "src/assets/image/books"

# Ensure directory exists
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

# Book covers from URLs in user's list
$bookCovers = @(
    # IGI Global books
    @{ Url = "https://www.igi-global.com/Images/Covers/9781466601017.png"; Filename = "9781466601019.png" },
    @{ Url = "https://www.igi-global.com/Images/Covers/9781466636798.png"; Filename = "9781466636793.png" },
    @{ Url = "https://www.igi-global.com/Images/Covers/default-book-cover.png"; Filename = "9809533076459.png" },
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/9781799818519.jpg"; Filename = "igi-handbook-bigdata.jpg" }
)

$downloaded = 0
$failed = 0

foreach ($book in $bookCovers) {
    try {
        $outputPath = Join-Path $outputDir $book.Filename
        Write-Host "Downloading $($book.Filename)..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri $book.Url -OutFile $outputPath -UseBasicParsing -ErrorAction Stop
        $downloaded++
        Write-Host "  Success!" -ForegroundColor Green
    }
    catch {
        Write-Host "  Failed: $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host "
Download Summary:" -ForegroundColor Yellow
Write-Host "Downloaded: $downloaded | Failed: $failed" -ForegroundColor White
