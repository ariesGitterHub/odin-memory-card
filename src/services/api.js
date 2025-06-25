export async function fetchWithHandling(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      let errorMessage = "An unknown error occurred.";

      switch (response.status) {
        case 400:
          errorMessage =
            "Invalid input: Please check your entries and try again.";
          break;
        case 403:
          errorMessage =
            "Access denied: You do not have permission to access this resource.";
          break;
        case 404:
          errorMessage =
            "The requested resource was not found. Please check the URL and try again.";
          break;
        case 429:
          errorMessage = "Too many requests: Please try again later.";
          break;
        case 500:
          errorMessage =
            "Server error: There is a problem with the service. Please try again later.";
          break;
        default:
          errorMessage = `HTTP error! Status: ${response.status}`;
      }

      return { data: null, error: errorMessage };
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      return { data: await response.json(), error: null }; // Consistent return structure
    } else {
      return { data: null, error: null }; // Handle non-JSON responses
    }
  } catch (error) {
    console.error("Fetch error: ", error.message);
    return {
      data: null,
      error:
        "Network error: Please check your internet connection and try again.",
    };
  }
}
