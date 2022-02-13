import React from 'react';
import {connect} from 'react-redux';

import {setCheck, deleteCheck} from '../../../../redux/data-reducer.js';

const Check = ({text, id, setCheck, deleteCheck}) => {
	const [checkText, setCheckText] = React.useState(text);

	const changeText = ({target: {value}}) => {
		setCheckText(value);
	}

	const changeCheck = () => {
		if(checkText !== text){
			if(checkText.length > 0){
				setCheck(checkText, id);
			}
			else{
				deleteCheck(checkText, id);
			}
		}
	}

	return(
		<div className="w100 m1">
			<input className="input w100" placeholder="Введите текст" value={checkText} onChange={changeText} onBlur={changeCheck} />
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {setCheck, deleteCheck})(Check);