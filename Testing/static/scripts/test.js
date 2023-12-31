document.addEventListener('DOMContentLoaded', function () {
    const streetInput = document.getElementById('country');
    const autocompleteResults = document.getElementById('autocomplete');
    const loadingButton = document.getElementById('submit');
    const loadingOverlay = document.getElementById('loading-overlay');

    loadingButton.addEventListener('click', () => {
        loadingOverlay.style.display = 'block'; // Display the loading overlay
      // Change 2000 to the desired delay in milliseconds
    });

    // Define the Nominatim API endpoint.
    const nominatimUrl = 'https://nominatim.openstreetmap.org/search';

    // Function to fetch and display autocomplete results.
    async function fetchAutocompleteResults(query) {
        const params = {
            q: query,
            format: 'json',
        };

        try {
            const response = await fetch(`${nominatimUrl}?${new URLSearchParams(params)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Clear previous results.
            autocompleteResults.innerHTML = '';

            // Display the autocomplete results.
            data.forEach(result => {
                const displayName = result.display_name;
                const listItem = document.createElement('li');
                listItem.textContent = displayName;
                listItem.addEventListener('click', () => {
                    streetInput.value = displayName;
                    autocompleteResults.innerHTML = ''; // Clear results after selection.
                });
                autocompleteResults.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching autocomplete results:', error);
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Event listener for input changes.
    streetInput.addEventListener('input', () => {
        const query = streetInput.value.trim();

        // Fetch and display autocomplete results when there's a query.
        if (query.length > 3) {
            sleep(2000);
            fetchAutocompleteResults(query);
        } else {
            autocompleteResults.innerHTML = ''; // Clear results when the input is empty.
        }
    });
});

