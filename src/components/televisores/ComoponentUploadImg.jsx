import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Icon } from '@iconify/react';
import { getDataWithToken } from "../../utils/getDataToken";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Swal from "sweetalert2";

const ComoponentUploadImg = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const res = await getDataWithToken("tv/images");
      if (res.success && res.media) {
        setImages(res.media);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las imágenes",
        customClass: {
          confirmButton: 'swal-confirm-btn'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    
    // Filter out duplicates based on filename and size
    const filteredNewFiles = newFiles.filter(newFile => 
      !selectedFiles.some(existingFile => 
        existingFile.name === newFile.name && existingFile.size === newFile.size
      )
    );
    
    // Add new files to existing selection
    setSelectedFiles(prev => [...prev, ...filteredNewFiles]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (e.dataTransfer.types && e.dataTransfer.types.includes('Files')) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const newFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    // Filter out duplicates based on filename and size
    const filteredNewFiles = newFiles.filter(newFile => 
      !selectedFiles.some(existingFile => 
        existingFile.name === newFile.name && existingFile.size === newFile.size
      )
    );
    
    // Add new files to existing selection
    setSelectedFiles(prev => [...prev, ...filteredNewFiles]);
  };

  // Remove individual file from selected files
  const removeSelectedFile = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // Helper para construir URL completa (soporta Firebase y local)
  const buildMediaUrl = (url) => {
    if (!url) return "";
    // Si ya es URL completa (Firebase), usarla directamente
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    // Si es URL local, añadir prefijo
    return `${process.env.REACT_APP_URL_IMAGE}${url}`;
  };

  // Helper function to download existing images as files
  const downloadImageAsFile = async (imageUrl, filename) => {
    try {
      const response = await fetch(buildMediaUrl(imageUrl));
      const blob = await response.blob();
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error(`Error downloading image ${filename}:`, error);
      return null;
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Por favor selecciona al menos un archivo (imagen o video)",
        customClass: {
          confirmButton: 'swal-confirm-btn'
        }
      });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      
      // First, download all existing images as files
      const existingImageFiles = await Promise.all(
        images.map(image => downloadImageAsFile(image.url, image.filename))
      );
      
      // Add existing images to FormData (filter out any failed downloads)
      existingImageFiles.forEach((file) => {
        if (file) {
          formData.append('media', file);
        }
      });
      
      // Add new images to FormData
      selectedFiles.forEach((file) => {
        formData.append('media', file);
      });

      const response = await fetch(`${process.env.REACT_APP_LINK_API}/tv/images/sync`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload successful:', result);
        
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: result.message || 'Archivos multimedia sincronizados correctamente',
          customClass: {
            confirmButton: 'swal-confirm-btn'
          }
        });
        setSelectedFiles([]);
        await fetchImages(); // Refresh images
      } else {
        const errorData = await response.text();
        console.error('Upload error response:', errorData);
        throw new Error(`Upload failed: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron subir los archivos",
        customClass: {
          confirmButton: 'swal-confirm-btn'
        }
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreviewVideo = (video) => {
    setPreviewVideo(video);
  };

  const closeVideoPreview = () => {
    setPreviewVideo(null);
  };

  const handleDeleteImage = async (imageToDelete) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta imagen se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'swal-confirm-btn',
        cancelButton: 'swal-cancel-btn'
      }
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        
        // Filter out the image to delete
        const remainingImages = images.filter(img => img.filename !== imageToDelete.filename);
        
        // Download remaining images as files
        const imageFiles = await Promise.all(
          remainingImages.map(image => downloadImageAsFile(image.url, image.filename))
        );
        
        // Create FormData with remaining images
        const formData = new FormData();
        imageFiles.forEach((file) => {
          if (file) {
            formData.append('media', file);
          }
        });

        const response = await fetch(`${process.env.REACT_APP_LINK_API}/tv/images/sync`, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "¡Eliminada!",
            text: "La imagen ha sido eliminada correctamente",
            customClass: {
              confirmButton: 'swal-confirm-btn'
            }
          });
          await fetchImages(); // Refresh images
        } else {
          throw new Error('Delete failed');
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la imagen",
          customClass: {
            confirmButton: 'swal-confirm-btn'
          }
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <SweetAlertStyles />
      <ComponentMain>
        <HeaderSection>
          <h1>Gestor de Imágenes TV</h1>
          <div className="header-info">
            <span className="image-count">{images.length} archivos</span>
          </div>
        </HeaderSection>

    <input
      ref={fileInputRef}
      type="file"
      multiple
      accept="image/*,video/*"
      onChange={handleFileSelect}
      style={{ display: 'none' }}
    />

    {/* Selected Files Preview */}
    {selectedFiles.length > 0 && (
      <SelectedFilesBar>
        <div className="files-info">
          <div className="files-count">
            <span>{selectedFiles.length} archivo(s) seleccionado(s)</span>
          </div>
          <div className="files-preview">
            {selectedFiles.slice(0, 4).map((file, index) => (
              <FilePreview key={index}>
                {file.type.startsWith('video/') ? (
                  <>
                    <video 
                      src={URL.createObjectURL(file)} 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                      muted
                      onLoadedData={(e) => {
                        e.target.currentTime = 0.1;
                        URL.revokeObjectURL(e.target.src);
                      }}
                    />
                    <div className="video-overlay-small">
                      <Icon icon="material-symbols:play-circle" width="16" height="16" />
                    </div>
                  </>
                ) : (
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={file.name}
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                  />
                )}
                <button 
                  className="remove-file-btn"
                  onClick={() => removeSelectedFile(index)}
                  title="Eliminar archivo"
                >
                  <Icon icon="material-symbols:close" width="10" height="10" />
                </button>
                {index === 3 && selectedFiles.length > 4 && (
                  <div className="more-indicator">+{selectedFiles.length - 4}</div>
                )}
              </FilePreview>
            ))}
          </div>
        </div>
        <div className="actions">
          <button 
            onClick={() => setSelectedFiles([])} 
            className="clear-btn"
          >
            Limpiar
          </button>
          <ButtonPrimary
            onClick={handleUpload}
            disabled={isUploading}
            className="upload-btn"
          >
            {isUploading ? 'Subiendo...' : 'Subir'}
            <Icon icon="material-symbols:upload" width="14" height="14" />
          </ButtonPrimary>
        </div>
      </SelectedFilesBar>
    )}

    {/* Images Grid with Integrated Upload */}
    <ImagesContainer
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={isDragActive ? 'drag-active' : ''}
    >
      {isLoading ? (
        <LoadingState>
          <div className="loading-spinner"></div>
          <p>Cargando imágenes...</p>
        </LoadingState>
      ) : (
        <DriveGrid>
          {/* Upload Square - Always First */}
          <UploadSquare 
            onClick={() => fileInputRef.current?.click()}
            className={isDragActive ? 'drag-active' : ''}
          >
            <div className="upload-content">
              <div className="upload-icon">
                <Icon icon="material-symbols:add" width="32" height="32" />
              </div>
              <span>Subir</span>
            </div>
          </UploadSquare>
          
          {/* Existing Images */}
          {images.map((image, index) => (
            <ImageItem key={image.filename}>
               <ImageThumbnail onClick={image.type === "video" ? () => handlePreviewVideo(image) : undefined}>
                 {image.type === "video" ? (
                   <>
                     {/* For videos, show first frame with video element or placeholder */}
                     <video 
                       src={buildMediaUrl(image.url)}
                       style={{
                         width: '100%',
                         height: '100%',
                         objectFit: 'cover',
                         cursor: 'pointer'
                       }}
                       muted
                       onLoadedData={(e) => {
                         // Move to first frame for thumbnail
                         e.target.currentTime = 0.1;
                       }}
                     />
                     {/* Video play icon overlay */}
                     <div className="video-overlay">
                       <Icon icon="material-symbols:play-circle" width="32" height="32" />
                     </div>
                   </>
                 ) : (
                   <img 
                     src={buildMediaUrl(image.url)} 
                     alt={image.filename}
                   />
                 )}
                <ImageActions>
                  <ActionButton 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevenir que se abra el modal de video
                      handleDeleteImage(image);
                    }}
                    className="delete-btn"
                    title={`Eliminar ${image.type === 'video' ? 'video' : 'imagen'}`}
                  >
                    <Icon icon="material-symbols:delete" width="16" height="16" />
                  </ActionButton>
                </ImageActions>
              </ImageThumbnail>
              <ImageDetails>
                <span className="name" title={image.filename}>
                  {image.filename.length > 12 ? `${image.filename.substring(0, 12)}...` : image.filename}
                </span>
                <span className="size">{(image.size / 1024 / 1024).toFixed(1)} MB</span>
              </ImageDetails>
            </ImageItem>
          ))}
        </DriveGrid>
      )}
    </ImagesContainer>
      </ComponentMain>
      
      {/* Video Preview Modal */}
      {previewVideo && (
        <VideoPreviewModal>
          <VideoPreviewBackdrop onClick={closeVideoPreview} />
          <VideoPreviewContent>
            <video 
              src={buildMediaUrl(previewVideo.url)}
              controls
              autoPlay
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px'
              }}
            />
          </VideoPreviewContent>
        </VideoPreviewModal>
      )}
      
      <SweetAlertStyles />
    </>
  );
};

// Upload Square Component
const UploadSquare = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1976d2;
    background: #f0f8ff;
  }
  
  &.drag-active {
    border-color: #1976d2;
    background: #e3f2fd;
    transform: scale(1.02);
  }
  
  .upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    pointer-events: none;
  }
  
  .upload-icon {
    opacity: 0.6;
    
    svg {
      color: #1976d2;
    }
  }
  
  span {
    font-size: 0.8rem;
    font-weight: 500;
    color: #6c757d;
  }
`;

export default ComoponentUploadImg;

// Global styles for SweetAlert buttons
const SweetAlertStyles = createGlobalStyle`
  .swal-confirm-btn {
    background-color: var(--color-primary) !important;
    color: white !important;
    border: none !important;
    border-radius: 6px !important;
    padding: 10px 20px !important;
    font-weight: 500 !important;
    
    &:hover {
      background-color: #0056b3 !important;
    }
  }
  
  .swal-cancel-btn {
    background-color: #6c757d !important;
    color: white !important;
    border: none !important;
    border-radius: 6px !important;
    padding: 10px 20px !important;
    font-weight: 500 !important;
    
    &:hover {
      background-color: #5a6268 !important;
    }
  }
`;

// Main Container
const ComponentMain = styled.div`
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
`;

// Header Section - Drive Style
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: white;
  border-bottom: 1px solid #e9ecef;
  border-radius: 12px 12px 0 0;
  
  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #343a40;
    margin: 0;
  }
  
  .header-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .image-count {
    font-size: 0.9rem;
    color: #6c757d;
    background: #f8f9fa;
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid #e9ecef;
  }
`;

// Selected Files Bar
const SelectedFilesBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: #e3f2fd;
  border-bottom: 1px solid #bbdefb;
  
  .files-info {
    display: flex;
    align-items: center;
    gap: 15px;
    
    .files-count {
      font-size: 0.9rem;
      color: #1976d2;
      font-weight: 500;
    }
    
    .files-preview {
      display: flex;
      gap: 8px;
    }
  }
  
  .actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .clear-btn {
    background: transparent;
    border: 1px solid #1976d2;
    color: #1976d2;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.2s ease;
    
    &:hover {
      background: #1976d2;
      color: white;
    }
  }
  
  .upload-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    padding: 8px 16px;
  }
`;

// File Preview Thumbnail
const FilePreview = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: visible; /* Changed to visible for X button */
  border: 2px solid #1976d2;
  
  &:hover .remove-file-btn {
    opacity: 1;
  }
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px; /* Inner border radius for image */
  }
  
  .video-overlay-small {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    pointer-events: none;
    
    svg {
      filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
    }
  }
  
  .remove-file-btn {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #dc3545;
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.9;
    transition: all 0.2s ease;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    
    svg {
      color: white;
    }
    
    &:hover {
      background: #c82333;
      transform: scale(1.15);
      opacity: 1;
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
    }
  }
  
  .more-indicator {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(25, 118, 210, 0.8);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
    border-radius: 4px;
  }
`;

// Main Images Container
const ImagesContainer = styled.div`
  flex: 1;
  padding: 20px 30px;
  overflow-y: auto;
  transition: all 0.2s ease;
  
  &.drag-active {
    background: #e3f2fd;
    border: 2px dashed #1976d2;
    border-radius: 8px;
  }
`;

// Loading State
const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e9ecef;
    border-top: 3px solid var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  p {
    color: #6c757d;
    margin: 0;
  }
`;


// Drive Grid
const DriveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  padding: 10px 0;
`;

// Image Item
const ImageItem = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

// Image Thumbnail
const ImageThumbnail = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 6px;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .video-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    pointer-events: none;
    
    svg {
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
    }
  }
`;

// Image Actions
const ImageActions = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  ${ImageThumbnail}:hover & {
    opacity: 1;
  }
`;

// Action Button
const ActionButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.delete-btn {
    background: rgba(220, 53, 69, 0.8);
    
    svg {
      color: white;
    }
    
    &:hover {
      background: #dc3545;
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(220, 53, 69, 0.4);
    }
  }
`;

// Image Details
const ImageDetails = styled.div`
  padding: 8px;
  
  .name {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    color: #343a40;
    margin-bottom: 2px;
    line-height: 1.1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .size {
    font-size: 0.65rem;
    color: #6c757d;
    margin-bottom: 2px;
  }
  
  .type {
    font-size: 0.65rem;
    color: #1976d2;
    font-weight: 500;
    text-transform: uppercase;
  }
`;

// Video Preview Modal Components
const VideoPreviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const VideoPreviewBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`;

const VideoPreviewContent = styled.div`
  position: relative;
  background: transparent;
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 10000;
  
  video {
    display: block;
    max-width: 90vw;
    max-height: 90vh;
    width: auto;
    height: auto;
  }
`;
