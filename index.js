document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const url = document.getElementById('articleUrl').value;
    const outputDiv = document.getElementById('summarizedText');

    // Clear previous output
    outputDiv.innerHTML = '';

    if (!url) {
        outputDiv.innerHTML = '<p style="color: red;">Please enter a valid URL.</p>';
        return;
    }

    const apiUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(url)}&lang=en&engine=2`;
    const apiKey = 'f85503a344mshc7fc96e289301b8p163d02jsn0e39599553ba'; 

    try {
        // Show a loading message
        outputDiv.innerHTML = '<p>Loading... Please wait.</p>';

        // Fetch data using the API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com',
                'x-rapidapi-key': apiKey,
            },
        });

        if (!response.ok) {
            console.error('API Error:', await response.text());
            outputDiv.innerHTML = `<p style="color: red;">Error: ${response.status} - ${response.statusText}</p>`;
            return;
        }

        // Parse the JSON response
        const data = await response.json();
        console.log(data); // Log the data to inspect the response

        if (data.summary) {
            outputDiv.innerHTML = `
                <p><strong>Summary:</strong></p>
                <p>${data.summary}</p>
            `;
        } else {
            outputDiv.innerHTML = '<p>No summary could be generated for this article.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        outputDiv.innerHTML = '<p style="color: red;">An error occurred. Please try again later.</p>';
    }
});