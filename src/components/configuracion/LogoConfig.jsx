import React, { useState, useCallback } from "react";
import styled from "styled-components";
import logo from "../../assets/logos/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { updateConfiguration } from "../../store/slice/configurations/configuration.thunk";

const LogoConfig = () => {
  const dispatch = useDispatch();
  const { configurationData } = useSelector((state) => state.configuration);

  // Estados para logo principal
  const [selectedLogoPrincipal, setSelectedLogoPrincipal] = useState(null);
  const [previewLogoPrincipal, setPreviewLogoPrincipal] = useState(null);
  const [isDraggingPrincipal, setIsDraggingPrincipal] = useState(false);
  
  // Estados para logo blanco
  const [selectedLogoBlanco, setSelectedLogoBlanco] = useState(null);
  const [previewLogoBlanco, setPreviewLogoBlanco] = useState(null);
  const [isDraggingBlanco, setIsDraggingBlanco] = useState(false);
  
  // Estado para loading y notificaciones
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: string }

  // Función para procesar archivos del logo principal
  const processFilePrincipal = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedLogoPrincipal(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogoPrincipal(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para procesar archivos del logo blanco
  const processFileBlanco = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedLogoBlanco(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogoBlanco(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejadores para logo principal
  const handleLogoPrincipalChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFilePrincipal(file);
    }
  };

  // Manejadores para logo blanco
  const handleLogoBlancoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFileBlanco(file);
    }
  };

  // Manejadores de drag and drop para logo principal
  const handleDragEnterPrincipal = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPrincipal(true);
  }, []);

  const handleDragLeavePrincipal = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDraggingPrincipal(false);
    }
  }, []);

  const handleDragOverPrincipal = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDropPrincipal = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPrincipal(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const imageFile = files.find(file => file.type.startsWith('image/'));
      if (imageFile) {
        processFilePrincipal(imageFile);
      }
    }
  }, []);

  // Manejadores de drag and drop para logo blanco
  const handleDragEnterBlanco = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingBlanco(true);
  }, []);

  const handleDragLeaveBlanco = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDraggingBlanco(false);
    }
  }, []);

  const handleDragOverBlanco = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDropBlanco = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingBlanco(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const imageFile = files.find(file => file.type.startsWith('image/'));
      if (imageFile) {
        processFileBlanco(imageFile);
      }
    }
  }, []);

  // Prevenir el comportamiento por defecto en toda la página
  const handlePageDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handlePageDrop = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Verificar si ya existe un logo principal
  const hasExistingLogo = configurationData?.logo_url;
  
  // El logo principal solo es obligatorio si no existe uno ya
  const isLogoPrincipalRequired = !hasExistingLogo;
  
  // Verificar si se puede guardar
  const canSave = isLogoPrincipalRequired ? selectedLogoPrincipal : (selectedLogoPrincipal || selectedLogoBlanco);

  // Función para mostrar notificación
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000); // Auto-hide después de 4 segundos
  };

  // Función para manejar el guardado
  const handleSave = async () => {
    if (!canSave) return;
    
    setIsLoading(true);
    setNotification(null); // Limpiar notificaciones previas
    
    try {
      const formData = new FormData();
      
      // Agregar logo principal si se seleccionó uno nuevo
      if (selectedLogoPrincipal) {
        formData.append('logo', selectedLogoPrincipal);
      }
      
      // Agregar logo blanco si se seleccionó uno nuevo
      if (selectedLogoBlanco) {
        formData.append('logo_white', selectedLogoBlanco);
      }
      
      const result = await dispatch(updateConfiguration(formData));
      
      if (result.success) {
        // Limpiar selecciones después del éxito
        setSelectedLogoPrincipal(null);
        setPreviewLogoPrincipal(null);
        setSelectedLogoBlanco(null);
        setPreviewLogoBlanco(null);
        
        // Mostrar notificación de éxito
        showNotification('success', '¡Logos actualizados correctamente! Los cambios se reflejarán automáticamente.');
      } else {
        showNotification('error', 'Error al actualizar los logos. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('error', 'Error de conexión. Verifica tu internet e inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Función para manejar el cancelar
  const handleCancel = () => {
    setSelectedLogoPrincipal(null);
    setPreviewLogoPrincipal(null);
    setSelectedLogoBlanco(null);
    setPreviewLogoBlanco(null);
  };

  React.useEffect(() => {
    // Prevenir drag and drop por defecto en toda la página
    document.addEventListener('dragover', handlePageDragOver);
    document.addEventListener('drop', handlePageDrop);
    
    return () => {
      document.removeEventListener('dragover', handlePageDragOver);
      document.removeEventListener('drop', handlePageDrop);
    };
  }, [handlePageDragOver, handlePageDrop]);

  return (
    <LogoConfigContainer>
      <h2>Configuración de Logos</h2>
      
      <InfoContainer>
        <InfoIcon>ℹ️</InfoIcon>
        <div>
          <InfoText>
            <strong>Logo Principal:</strong> Se usará en toda la aplicación (fondos claros).
          </InfoText>
          <InfoText>
            <strong>Logo Blanco:</strong> Se usará en fondos oscuros. Si no se proporciona, se usará el logo principal.
          </InfoText>
          <InfoText>
            <strong>Recomendación:</strong> Usar imágenes PNG o SVG con fondo transparente. Tamaño óptimo: 280px de ancho.
          </InfoText>
        </div>
      </InfoContainer>
      
      {/* Logo Principal (Obligatorio) */}
      <LogoSection>
        <LogoSectionTitle>
          <h3>🖼️ Logo Principal</h3>
          {isLogoPrincipalRequired ? (
            <RequiredBadge>Obligatorio</RequiredBadge>
          ) : (
            <OptionalBadge>Opcional</OptionalBadge>
          )}
        </LogoSectionTitle>
        
        <LogoPreviewContainer>
          <CurrentLogoContainer>
            <h4>Actual</h4>
            <LogoPreviewBox>
              <img 
                src={`${process.env.REACT_APP_URL_IMAGE}${configurationData?.logo_url}`} 
                alt="Logo principal actual" 
              />
            </LogoPreviewBox>
          </CurrentLogoContainer>
          
          <NewLogoContainer>
            <h4>Nuevo</h4>
            <LogoPreviewBox
              isDragging={isDraggingPrincipal}
              onDragEnter={handleDragEnterPrincipal}
              onDragLeave={handleDragLeavePrincipal}
              onDragOver={handleDragOverPrincipal}
              onDrop={handleDropPrincipal}
            >
              {previewLogoPrincipal ? (
                <img src={previewLogoPrincipal} alt="Vista previa del logo principal" />
              ) : (
                <EmptyLogoPlaceholder>
                  {isDraggingPrincipal ? (
                    <p>📁 Suelta la imagen aquí</p>
                  ) : (
                    <p>Arrastra una imagen aquí</p>
                  )}
                </EmptyLogoPlaceholder>
              )}
            </LogoPreviewBox>
          </NewLogoContainer>
        </LogoPreviewContainer>

        <UploadContainer>
          <FileInputContainer>
            <label htmlFor="logo-principal-upload" className="custom-file-upload">
              📁 Seleccionar Logo Principal
            </label>
            <input 
              id="logo-principal-upload"
              type="file" 
              accept="image/*" 
              onChange={handleLogoPrincipalChange} 
            />
            <span>{selectedLogoPrincipal ? selectedLogoPrincipal.name : 'Ningún archivo seleccionado'}</span>
          </FileInputContainer>
        </UploadContainer>
      </LogoSection>

      {/* Logo Blanco (Opcional) */}
      <LogoSection>
        <LogoSectionTitle>
          <h3>⚪ Logo en Blanco</h3>
          <OptionalBadge>Opcional</OptionalBadge>
        </LogoSectionTitle>
        
        <LogoPreviewContainer>
          <CurrentLogoContainer>
            <h4>Actual</h4>
            <LogoPreviewBox darkBg>
              <img 
                src={`${process.env.REACT_APP_URL_IMAGE}${configurationData?.logo_white_url || configurationData?.logo_url}`} 
                alt="Logo blanco actual" 
                onError={(e) => {
                  // Si no existe logo-blanco.png, mostrar el logo principal
                  e.target.src = logo;
                }}
              />
            </LogoPreviewBox>
          </CurrentLogoContainer>
          
          <NewLogoContainer>
            <h4>Nuevo</h4>
            <LogoPreviewBox
              darkBg
              isDragging={isDraggingBlanco}
              onDragEnter={handleDragEnterBlanco}
              onDragLeave={handleDragLeaveBlanco}
              onDragOver={handleDragOverBlanco}
              onDrop={handleDropBlanco}
            >
              {previewLogoBlanco ? (
                <img src={previewLogoBlanco} alt="Vista previa del logo blanco" />
              ) : (
                <EmptyLogoPlaceholder>
                  {isDraggingBlanco ? (
                    <p style={{ color: 'white' }}>📁 Suelta la imagen aquí</p>
                  ) : (
                    <p style={{ color: 'white' }}>Arrastra una imagen aquí</p>
                  )}
                </EmptyLogoPlaceholder>
              )}
            </LogoPreviewBox>
          </NewLogoContainer>
        </LogoPreviewContainer>

        <UploadContainer>
          <FileInputContainer>
            <label htmlFor="logo-blanco-upload" className="custom-file-upload secondary">
              ⚪ Seleccionar Logo Blanco
            </label>
            <input 
              id="logo-blanco-upload"
              type="file" 
              accept="image/*" 
              onChange={handleLogoBlancoChange} 
            />
            <span>{selectedLogoBlanco ? selectedLogoBlanco.name : 'Ningún archivo seleccionado'}</span>
          </FileInputContainer>
        </UploadContainer>
      </LogoSection>

      <ButtonContainer>
        <ActionButton 
          disabled={!canSave || isLoading} 
          primary
          onClick={handleSave}
        >
          {isLoading ? '⏳ Guardando...' : '💾 Guardar Cambios'}
        </ActionButton>
        <ActionButton 
          disabled={isLoading}
          onClick={handleCancel}
        >
          🔄 Cancelar
        </ActionButton>
      </ButtonContainer>
      
      {/* Loading Overlay */}
      {isLoading && (
        <LoadingOverlay>
          <LoadingCard>
            <LoadingSpinner />
            <LoadingText>Subiendo logos...</LoadingText>
            <p style={{ margin: 0, color: '#666', textAlign: 'center' }}>
              Por favor espera mientras procesamos tus imágenes
            </p>
          </LoadingCard>
        </LoadingOverlay>
      )}
      
      {/* Notification */}
      {notification && (
        <NotificationContainer>
          <NotificationCard type={notification.type}>
            <NotificationIcon>
              {notification.type === 'success' ? '✅' : '❌'}
            </NotificationIcon>
            <NotificationMessage>
              {notification.message}
            </NotificationMessage>
          </NotificationCard>
        </NotificationContainer>
      )}
    </LogoConfigContainer>
  );
};

// Loading Overlay
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

const LoadingCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-width: 300px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.h3`
  color: #333;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

// Notification
const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  max-width: 400px;
`;

const NotificationCard = styled.div`
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.type === 'success' ? '#c3e6cb' : '#f5c6cb'};
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const NotificationIcon = styled.div`
  font-size: 20px;
  flex-shrink: 0;
`;

const NotificationMessage = styled.div`
  font-weight: 500;
  line-height: 1.4;
`;

export default LogoConfig;

const LogoConfigContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;

  h2 {
    color: #305381;
    margin: 0 -20px 0 -20px;
    position: sticky;
    top: 0;
    background-color: white;
    padding: 15px 20px 15px 20px;
    z-index: 1;
    border-bottom: 1px solid #f0f0f0;
  }

  h3 {
    color: #666;
    margin-bottom: 10px;
  }
`;

const LogoPreviewContainer = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const CurrentLogoContainer = styled.div`
  flex: 1;
  
  h4 {
    color: #666;
    margin: 0 0 10px 0;
    font-size: 1em;
  }
`;

const NewLogoContainer = styled.div`
  flex: 1;
  
  h4 {
    color: #666;
    margin: 0 0 10px 0;
    font-size: 1em;
  }
`;

const LogoSection = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fafafa;
  flex-shrink: 0;
`;

const LogoSectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  
  h3 {
    color: #305381;
    margin: 0;
    font-size: 1.3em;
  }
`;

const RequiredBadge = styled.span`
  background-color: #ff4757;
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const OptionalBadge = styled.span`
  background-color: #747d8c;
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const LogoPreviewBox = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed ${props => props.isDragging ? '#305381' : '#ccc'};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${props => 
    props.darkBg 
      ? (props.isDragging ? '#2c2c2c' : '#333333')
      : (props.isDragging ? '#f0f7ff' : '#f9f9f9')
  };
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    border-color: #305381;
    background-color: ${props => 
      props.darkBg ? '#2c2c2c' : '#f0f7ff'
    };
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const EmptyLogoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: #aaa;
    font-style: italic;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  p {
    color: #555;
  }
`;

const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  input[type="file"] {
    display: none;
  }

  .custom-file-upload {
    background-color: #305381;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;

    &:hover {
      background-color: #264269;
    }
    
    &.secondary {
      background-color: #747d8c;
      
      &:hover {
        background-color: #57606f;
      }
    }
  }

  span {
    color: #666;
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 15px -20px 0 -20px;
  padding: 15px 20px;
  border-top: 1px solid #eee;
  flex-shrink: 0;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 1;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  background-color: ${props => props.primary ? '#305381' : '#f1f1f1'};
  color: ${props => props.primary ? 'white' : '#333'};

  &:hover {
    background-color: ${props => props.primary ? '#264269' : '#e1e1e1'};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background-color: #f0f7ff;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #305381;
  margin: 10px 0 20px 0;
  flex-shrink: 0;
`;

const InfoIcon = styled.span`
  font-size: 18px;
`;

const InfoText = styled.p`
  color: #555;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;
