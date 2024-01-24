const InteractMobileComponent = ({ interactLogic }) => {
    const interactionButtonStyle = {
      padding: '10px',
      background: 'linear-gradient(to right, #1a1a1a, #333, #1a1a1a)',
      color: '#fff',
      borderRadius: '8px',
      border: '2px solid #fff',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      cursor: 'pointer',
      boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',
    };
  
    return (
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: '1000' }}>
        <button style={interactionButtonStyle} onClick={() => interactLogic()}>
          Interact with NPC
        </button>
      </div>
    );
  };
  
  export default InteractMobileComponent;