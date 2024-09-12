import Buyer from './Buyer.js';
import Receiver from './Receiver.js';

function Information({copyUser}) {

	return(
		<>
		<div className="section2">
			<h2 style={{textAlign:"center"}}>INFORMATION</h2>
			<br/><hr/>
			<Buyer copyUser={copyUser}/>

			<br/>
			<hr style={{width:"20%"}}/>
			<br/>

			<Receiver copyUser={copyUser}/>
			
		</div>
		</>
	)
}

export default Information;