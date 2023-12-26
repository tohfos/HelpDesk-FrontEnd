//import GenAnalytics from '../../../components/Analytics/GenAnalytics'
import Header from '../../../components/Analytics/Header'
import { useState } from 'react'
import Cookies from 'js-cookie'
import Agent from '../../../components/Analytics/Agent'
import TicketCategory from '../../../components/Analytics/TicketCategory'
import SubCategory from '../../../components/Analytics/SubCategory'
import LineChart from '../../../components/Analytics/LineChart'
const Index = () => {
    const [showGenAnalysis, setShowGenAnalysis] = useState(false)
    const [startDate,setStartDate]= useState(null)
    const [endDate,setEndDate]= useState(null)
    const [analysis,setAnalysis] = useState({})
    const [value,setValue] = useState('')
    const [tickets,setTickets] = useState([])
    const [rating,setRating] = useState([])
    const [resolutionTime,setResolutionTime] = useState([])
    const handleChange = (event) => {

        setValue(event.target.value);
     
      };
      const ratingsChartData = {
        labels: tickets,
        values: rating,
      };
      const resolutionTimeChartData = {
        labels: tickets,
        values: resolutionTime,
      };
    const generateAnalyticsAgent = async(id)=>{
       try{
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/generateAnalytics1/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            credentials: 'include',
            body: JSON.stringify({"startDate": startDate ,"endDate":endDate} )
        })
        const data = await response.json()
        setTickets(data.analyticsDetails.ticketId)
         setRating(data.analyticsDetails.Rating)
         setResolutionTime(data.analyticsDetails.ResolutionTime)
    }catch (error) {
        console.log(error)
    }
    }
    const generateAnalyticsCategory = async(category)=>{
        try{
         const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/generateAnalytics3/${category.category}`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + Cookies.get('token')
             },
             credentials: 'include',
             body: JSON.stringify({"startDate": startDate ,"endDate":endDate} )
         })
         const data = await response.json()
         console.log(data)
         setTickets(data.analyticsDetails.ticketId)
         setRating(data.analyticsDetails.Rating)
         setResolutionTime(data.analyticsDetails.ResolutionTime)
     }catch (error) {
         console.log(error)
     }  
     }
     const generateAnalyticsSubCategory = async(subCategory)=>{
        try{
            console.log('zzz')
            const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/generateAnalytics2/${subCategory.subCategory}`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + Cookies.get('token')
             },
             credentials: 'include',
             body: JSON.stringify({"startDate": startDate ,"endDate":endDate} )
         })
         console.log('zzs')
         const data = await response.json()
         console.log(data)
         setTickets(data.analyticsDetails.ticketId)
         setRating(data.analyticsDetails.Rating)
         setResolutionTime(data.analyticsDetails.ResolutionTime)
     }catch (error) {
         console.log(error)
     }  
     }
    return(
        <div>
            <Header
        onAdd={() => setShowGenAnalysis(!showGenAnalysis)}
      />
      <>
      {showGenAnalysis && 
      <input type="text" 
        placeholder="Start Date in yyyy-mm-dd" 
        class="input input-bordered w-full max-w-xs" 
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
/>
}
      </>
      {showGenAnalysis && 
      <input type="text" 
        placeholder="End Date in yyyy-mm-dd" 
        class="input input-bordered w-full max-w-xs" 
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
/>}
      <>
        {showGenAnalysis &&  
        
        
        <label>
    Generate analytics for
<select onChange={handleChange} class="select select-bordered w-full max-w-xs">
  
  <option disabled selected>Generate analytics for</option>

  <option value="Agent">Agent</option>

  <option value="ticketCategory">ticket category</option>

  <option value="SubCategory">Sub-category</option>

</select>
</label>}
<> 
        {value==='Agent' && <Agent onAdd={generateAnalyticsAgent}/> }
        {value==='ticketCategory' && <TicketCategory onAdd={generateAnalyticsCategory}/>}
        {value==='SubCategory' && <SubCategory onAdd={generateAnalyticsSubCategory}/>}
        <LineChart data={ratingsChartData} />
        <LineChart data={resolutionTimeChartData} />        
        </>
      </>
      
        </div>

    )

}
export default Index