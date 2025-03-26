import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Set the worker manually (fixes "pdf.worker.entry is not defined" issue)
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function shuffleArrayRandomly(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function extractFirstLine(markdown) {
  const start = markdown.indexOf("#");
  if (start == -1) return null;
  const end = markdown.indexOf("\n", start);
  if (end === -1) return null;
  const what = [markdown.slice(start + 2, end).trim()];
  return what;
}

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

async function getPDFMetadata({ file, setAuthorName, setBookTitle }) {
  if (!(file instanceof Blob)) {
    console.error("Invalid file format:", file);
    return;
  }

  const reader = new FileReader();

  reader.onload = async function () {
    try {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await getDocument({ data: typedArray }).promise;
      const metadata = await pdf.getMetadata();

      const title = metadata.info?.Title || "Unknown Title";
      const author = metadata.info?.Author || "Unknown Author";

      // Update state (if provided)
      if (setBookTitle) setBookTitle(title);
      if (setAuthorName) setAuthorName(author);
    } catch (error) {
      console.error("Error extracting PDF metadata:", error);
    }
  };

  reader.readAsArrayBuffer(file);
}

export { getPDFMetadata, formatDate, extractFirstLine, shuffleArrayRandomly };