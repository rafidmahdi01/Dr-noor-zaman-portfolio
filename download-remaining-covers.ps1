# Download missing book covers
$outputDir = "src/assets/image/books"

# Ensure directory exists
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

# Book covers to download
$bookCovers = @(
    # 2025 IGI Global books
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/9798369384978.webp"; Filename = "9798369384978.webp" },
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/9781668463611.webp"; Filename = "9781668463612.webp" },
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/9798369362501.webp"; Filename = "9798369362501.webp" },
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/9798369391327.webp"; Filename = "9798369391327.webp" },
    
    # 2024 Springer COMS2 2024
    @{ Url = "https://media.springernature.com/full/springer-static/cover-hires/book/978-3-031-75169-8"; Filename = "9783031751698.jpg" },
    
    # 2022 Books
    @{ Url = "https://media.springernature.com/full/springer-static/cover-hires/book/978-3-031-10551-7"; Filename = "coms2-2022-duplicate.jpg" },
    
    # 2021 IGI Global
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/9781799851516.webp"; Filename = "9781799851516.webp" },
    
    # 2016 Books
    @{ Url = "https://www.intechopen.com/media/covers/non-destructive-testing.jpg"; Filename = "9789535125020-ndt.jpg" },
    
    # 2015 IGI Global
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/default-book-cover.png"; Filename = "igi-bigdata-2015.png" },
    
    # 2013/2012 Books
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/9781466636798.webp"; Filename = "9781466636798.webp" },
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/9781466601019.webp"; Filename = "9781466601019.webp" }
)

$downloaded = 0
$failed = 0

foreach ($book in $bookCovers) {
    try {
        $outputPath = Join-Path $outputDir $book.Filename
        if (Test-Path $outputPath) {
            Write-Host "Skipping $($book.Filename) - already exists" -ForegroundColor Yellow
            continue
        }
        Write-Host "Downloading $($book.Filename)..." -ForegroundColor Cyan
        Invoke-WebRequest -Uri $book.Url -OutFile $outputPath -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
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
