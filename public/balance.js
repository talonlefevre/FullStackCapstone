function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [balance, setBalance] = React.useState('');  // added this line

  return (
    <Card
      bgcolor="info"
      header={
        <div style={{ textAlign: 'center' }}>
          Balance
        </div>
      }
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} setBalance={setBalance}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus} balance={balance}/>}
    />
  )
}

function BalanceMsg(props){
  return(
    <>
      <h5>Your balance is: {props.balance}</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
          props.setBalance(''); // reset balance to an empty string
        }}>
          Check balance again
      </button>
    </>
  );
}

function BalanceForm(props){
  const [email, setEmail] = React.useState('');

  function handle(){
    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(`Your balance is: ${data.balance}`);
            props.setBalance(data.balance); // set balance to the fetched balance
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Error fetching balance')
            console.log('err:', text);
        }
    });
  }

  return (
    <>
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>

      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>
          Check Balance
      </button>
    </>
  );
}
