function Logout() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
  
    return (
      <Card
        bgcolor="info"
        header={
          <div style={{ textAlign: 'center' }}>
            Logout
          </div>
        }
        status={status}
        body={show ? 
          <LogoutForm setShow={setShow} setStatus={setStatus}/> :
          <LogoutMsg setShow={setShow} setStatus={setStatus}/>}
      />
    );
  }
  
  function LogoutMsg(props) {
    return (
      <>
        <h5>Successfully logged out</h5>
        <button type="submit" 
          className="btn btn-light" 
          onClick={() => {
            props.setShow(true);
            props.setStatus('');
          }}>
            Log out again
        </button>
      </>
    );
  }
  
  function LogoutForm(props) {
    function handle(){
      fetch(`/account/logout`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus('Successfully logged out');
              props.setShow(false);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Logout failed')
              console.log('err:', text);
          }
      });
    }
  
    return(
      <>
        <button type="submit" 
          className="btn btn-light" 
          onClick={handle}>
            Log out
        </button>
      </>
    );
  }
  