function AuthLayout({ leftContent, rightContent }) {
    return (
      <div className="auth-wrapper">
  
        <div className="auth-card">
  
          <div className="left-panel">
            {leftContent}
          </div>
  
  
          <div className="right-panel">
            {rightContent}
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default AuthLayout;