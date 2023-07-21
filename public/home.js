function Home(){
  return (
    <Card
      bgcolor="info"
      txtcolor="white"
      header={
        <div style={{ textAlign: 'center' }}>
          Bad Bank Home Page
        </div>
      }
      title={
        <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
          Your Financial Partner Not On-the-Go.
        </div>
      }
      text={<img src="bank.png" className="img-fluid" alt="Responsive Image" />}
    />
  );
}
