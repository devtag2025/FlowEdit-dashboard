/**
 * Force-download a file from a URL instead of opening it in the browser.
 * Fetches the file as a blob and triggers a download via a temporary <a> tag.
 */
export async function downloadFile(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename || "contract.pdf";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
    // Fallback: open in new tab
    window.open(url, "_blank");
  }
}
