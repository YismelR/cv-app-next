import puppeteer from "puppeteer";

export async function POST(request: Request) {
    const data = await request.json();
    const { html } = data;

    if (!html) {
        return Response.json(
            { message: "Method Not Allowed" },
            { status: 400 }
        );
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(
            `
            <!doctype html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body>
                    ${html}
                </body>
            </html>`,
            { waitUntil: "networkidle0" }
        );

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
        });

        await browser.close();

        return new Response(pdf, {
            status: 201,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=resume.pdf",
            },
        });
    } catch (error) {
        return Response.json(
            { message: "Error generating PDF" },
            { status: 400 }
        );
    }
}
