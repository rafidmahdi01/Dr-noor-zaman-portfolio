# PowerShell script to download book cover images
$outputDir = "src/assets/image/books"

if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
    Write-Host "Created directory: $outputDir"
}

$bookCovers = @(
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9798369389447.webp"; File="9798369389447.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9798369389393.webp"; File="9798369389393.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9798369337035.webp"; File="9798369337035.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9798369354155.webp"; File="9798369354155.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9781668463611.webp"; File="9781668463611.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9781668476253.webp"; File="9781668476253.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9798369313633.webp"; File="9798369313633.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9798369338162.webp"; File="9798369338162.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9798369353752.webp"; File="9798369353752.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9798369307748.webp"; File="9798369307748.webp"},
    @{Url="https://shop.theiet.org/Media/Default/Products/PBSE0250.jpg"; File="PBSE0250.jpg"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9781668498231.webp"; File="9781668498231.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9781668459256.webp"; File="9781668459256.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9781668452844.webp"; File="9781668452844.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9781799896241.webp"; File="9781799896241.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9781799889298.webp"; File="9781799889298.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9781799892014.webp"; File="9781799892014.webp"},
    @{Url="https://images.routledge.com/common/jackets/crclarge/978036736/9780367365721.jpg"; File="9780367365721.jpg"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9781799867098.webp"; File="9781799867098.webp"},
    @{Url="https://coverimages.igi-global.com/cover-images/covers/9781799818519.webp"; File="9781799818519.webp"},
    @{Url="https://images.routledge.com/common/jackets/crclarge/978036743/9780367431372.jpg"; File="9780367431372.jpg"}
)

$successCount = 0
$failCount = 0

foreach ($book in $bookCovers) {
    $outputPath = Join-Path $outputDir $book.File
    try {
        Write-Host "Downloading: $($book.File)..."
        Invoke-WebRequest -Uri $book.Url -OutFile $outputPath -UseBasicParsing
        $successCount++
        Write-Host "Success" -ForegroundColor Green
    }
    catch {
        $failCount++
        Write-Host "Failed" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Downloaded: $successCount | Failed: $failCount"
