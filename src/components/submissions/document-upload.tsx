import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface DocumentUploadProps {
  documents: string[];
  onDocumentsChange: (documents: string[]) => void;
}

export function DocumentUpload({ documents, onDocumentsChange }: DocumentUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Here we would normally upload the files to a storage service
    // For now, we'll just store the file names
    const newDocuments = acceptedFiles.map(file => URL.createObjectURL(file));
    onDocumentsChange([...documents, ...newDocuments]);
  }, [documents, onDocumentsChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 5242880, // 5MB
  });

  const removeDocument = (index: number) => {
    const newDocuments = [...documents];
    newDocuments.splice(index, 1);
    onDocumentsChange(newDocuments);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'}`}
      >
        <input {...getInputProps()} />
        <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Drop the files here..."
            : "Drag and drop files here, or click to select files"}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          PDF, DOC, DOCX up to 5MB
        </p>
      </div>

      {documents.length > 0 && (
        <ul className="divide-y divide-gray-200">
          {documents.map((doc, index) => (
            <li key={index} className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <DocumentIcon className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-900">
                  {doc.split('/').pop()}
                </span>
              </div>
              <button
                onClick={() => removeDocument(index)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}