import React,{useState} from "react";

const Feedback=()=>{

const [feedback,setFeedback]=useState({

name:"",
message:""

});

const handleChange=(e)=>{

setFeedback({

...feedback,
[e.target.name]:e.target.value

});

};

const handleSubmit=(e)=>{

e.preventDefault();

console.log(feedback);

alert("Thank you for your Feedback");

};

return(

<div className="form-container">

<form onSubmit={handleSubmit}>

<h2>Feedback</h2>

<input
type="text"
name="name"
placeholder="Your Name"
value={feedback.name}
onChange={handleChange}
required
/>

<textarea
name="message"
rows="5"
placeholder="Write your feedback"
value={feedback.message}
onChange={handleChange}
required
></textarea>

<button>Submit</button>

</form>

</div>

);

};

export default Feedback;