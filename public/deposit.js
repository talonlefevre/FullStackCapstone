function Deposit(){
  const [show, setShow]       = React.useState(true);
  const [status, setStatus]   = React.useState('');
  const [amount, setAmount]   = React.useState('');

  return (
    <Card
      bgcolor="info"
      header={
        <div style={{ textAlign: 'center' }}>
          Deposit
        </div>
      }
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus} setAmount={setAmount}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus} amount={amount}/>}
    />
  )
}

function DepositMsg(props){
  return (
    <>
      <h5>Success, you deposited {props.amount}!</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
            props.setShow(true);
            props.setStatus('');
            props.setAmount('');
        }}>
          Deposit again
      </button>
    </>
  );
}

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/update/${email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(`You deposited: ${amount}`);
            props.setAmount(amount);  
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
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
        value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>

      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Deposit</button>
    </>
  );
}
