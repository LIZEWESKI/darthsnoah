const ErrorMessage = (keyword,searchInvalid,filterInvalid)=>{
    if(searchInvalid){
        return `
            <h1>No result found for '<span> ${keyword} </span>'</h1>
            <h2>Maybe a little spelling mistake?</h2>
        `;
    } else if(filterInvalid){
        return `
            <h2>No characters match the selected filters. Please adjust your criteria and try again.</h2>
        `;
    }else {
        return `
            <h1>Something weird is happening Fellas... Please try again later</h1>
        `;
    }
}
export default ErrorMessage;