export const downloadTextFile = (text: string, filename: string) => {
  // Create a blob with the text content
  const blob = new Blob([text], { type: 'text/plain' });
  
  // Create a temporary URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary <a> element to trigger the download
  const a = document.createElement('a');
  a.href = url;
  
  // Format the date for the filename
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  // Set the download attribute with formatted filename
  a.download = `${filename}_${formattedDate}.txt`;
  
  // Append to the body, click, and clean up
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};
