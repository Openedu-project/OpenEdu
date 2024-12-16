export interface DownloadFileProps {
  fileUrl: string;
  fileName: string;
}

export const processFileName = (fileName: string): string => {
  const underscoreIndex = fileName.lastIndexOf('_');

  if (underscoreIndex === -1) {
    return fileName;
  }
  return fileName.slice(underscoreIndex + 1);
};

export const downloadFile = async ({ fileUrl, fileName }: DownloadFileProps): Promise<void> => {
  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', fileName);
    document.body.append(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

export const downloadAllFiles = async (files: DownloadFileProps[]): Promise<void> => {
  try {
    for (const file of files) {
      await downloadFile(file);
      // Add a short interval between loads to avoid browser overload
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error('Error downloading files:', error);
    throw error;
  }
};
