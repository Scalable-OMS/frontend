import React, { useEffect, useState } from 'react';
import CommonContext from '../CommonContext';

const CommonProvider = ({ children }) => {
	const [routesData, set]

	return (
		<CommonContext.Provider
			value={{
				
			}}
		>
			{children}
		</CommonContext.Provider>
	)
}

export default CommonProvider;