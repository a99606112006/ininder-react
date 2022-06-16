import React,{useState, useEffect} from 'react';

const Home = () => {
	
	const [name, setName] = useState();
	
	
	useEffect( ()=>{
		(
			async()=>{
				const response = await fetch('http://localhost:8000/api/user',{
					header:{'Content0Type':'application/json'},
					credentials:'include'
				
				});
				const content = await response.json();
				setName(content.name);
			}
	
	)();

	});
	
	
	return(
		<div>
		{name? 'Hi' + name: 'Not login'}
		</div>
	);
	
	
};

export default Home;



//update

const Home = (props:{name:string}) => {
	
	return(
		<div>
		{props.name? 'Hi' + props.name: 'Not login'}
		</div>
	);
	
	
};