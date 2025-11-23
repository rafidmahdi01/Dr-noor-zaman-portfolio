# Download book covers for complete book list update
$outputDir = "src/assets/image/books"

# Ensure directory exists
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

# Book covers to download
$bookCovers = @(
    # New books to add
    @{ Url = "https://www.wiley.com/en-us/exportProductCoverImage/productcd/111976226X.jpg"; Filename = "111976226X.jpg" },
    @{ Url = "https://images-na.ssl-images-amazon.com/images/I/51qD5xJKZJL.jpg"; Filename = "9798759699880.jpg" },
    @{ Url = "https://images.routledge.com/common/jackets/crclarge/978103248/9781032484105.jpg"; Filename = "9781032484105.jpg" },
    @{ Url = "https://media.springernature.com/full/springer-static/cover-hires/book/978-981-99-3611-3"; Filename = "9789819936113.jpg" },
    @{ Url = "https://media.springernature.com/full/springer-static/cover-hires/book/978-3-031-40564-8"; Filename = "9783031405648.jpg" },
    @{ Url = "https://media.springernature.com/full/springer-static/cover-hires/book/978-3-031-10551-7"; Filename = "9783031105517.jpg" },
    
    # Existing books missing covers
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/9781466601019.jpg"; Filename = "9781466601019.jpg" },
    @{ Url = "https://coverimages.igi-global.com/newsiteimages/Covers/9781466636793.jpg"; Filename = "9781466636793.jpg" },
    @{ Url = "https://www.intechopen.com/media/covers/digital-filters-and-signal-processing.jpg"; Filename = "9809533076459.jpg" },
    @{ Url = "https://www.intechopen.com/media/covers/non-destructive-testing.jpg"; Filename = "9789535125020.jpg" },
    @{ Url = "https://images.routledge.com/common/jackets/crclarge/978113857/9781138571303.jpg"; Filename = "9781138571303.jpg" },
    @{ Url = "https://images.routledge.com/common/jackets/crclarge/978103206/9781032066202.jpg"; Filename = "9781032066202.jpg" },
    @{ Url = "https://www.wiley.com/en-us/exportProductCoverImage/productcd/1119768772.jpg"; Filename = "1119768772.jpg" },
    @{ Url = "https://www.wiley.com/en-us/exportProductCoverImage/productcd/1119836190.jpg"; Filename = "1119836193.jpg" },
    @{ Url = "https://media.springernature.com/full/springer-static/cover-hires/book/978-3-030-98167-9"; Filename = "9783030981679.jpg" },
    @{ Url = "https://media.springernature.com/full/springer-static/cover-hires/book/978-3-030-75855-4"; Filename = "9783030758554.jpg" },
    @{ Url = "https://images.routledge.com/common/jackets/crclarge/978036764/9780367641696.jpg"; Filename = "9780367641696.jpg" },
    @{ Url = "https://onlinelibrary.wiley.com/cms/asset/5d8c8e5e-8f7a-4f5a-9e2d-8f3b5e6c7d8e/9781394204472.cover.png"; Filename = "9781394204267.jpg" }
)

$downloaded = 0
$failed = 0

foreach ($book in $bookCovers) {
    try {
        $outputPath = Join-Path $outputDir $book.Filename
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
