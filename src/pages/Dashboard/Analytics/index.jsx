//import GenAnalytics from '../../../components/Analytics/GenAnalytics'
import Header from '../../../components/Analytics/Header'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Agent from '../../../components/Analytics/Agent'
import TicketCategory from '../../../components/Analytics/TicketCategory'
import SubCategory from '../../../components/Analytics/SubCategory'
import LineChart2 from '../../../components/Analytics/LineChart2'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Legend,
    Tooltip
  )
const Index = () => {
    const [showGenAnalysis, setShowGenAnalysis] = useState(false)
    const [startDate,setStartDate]= useState(null)
    const [endDate,setEndDate]= useState(null)
    const [analysis,setAnalysis] = useState({})
    const [value,setValue] = useState('')
    const [tickets,setTickets] = useState([])
    const [rating,setRating] = useState([])
    const [resolutionTime,setResolutionTime] = useState([])
    useEffect(() => {
        const fetchData = async (id,category,subCategory) => {
          try {
            let response;
            let data;
    
            if (value === 'Agent') {
              response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/generateAnalytics1/${id.agentId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + Cookies.get('token'),
                },
                credentials: 'include',
                body: JSON.stringify({ startDate, endDate }),
              });
            } else if (value === 'ticketCategory') {
              response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/generateAnalytics3/${category.category}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + Cookies.get('token'),
                },
                credentials: 'include',
                body: JSON.stringify({ startDate, endDate }),
              });
            } else if (value === 'SubCategory') {
              response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/generateAnalytics2/${subCategory.subCategory}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + Cookies.get('token'),
                },
                credentials: 'include',
                body: JSON.stringify({ startDate, endDate }),
              });
            }
    
            data = await response.json();
    
            let ticks = data.analyticsDetails.ticketId;
            setTickets(ticks.map((ticket) => ticket));
    
            let rates = data.analyticsDetails.Rating;
            setRating(rates.map((ratings) => ratings));
    
            let times = data.analyticsDetails.ResolutionTime;
            setResolutionTime(times.map((time) => time));
          } catch (error) {
            console.log(error);
          }
        };
    
        
      }, [ startDate, endDate, value]); 
      const data = {
        labels: tickets,
        datasets: [{
            label: `analytics for ${value} for ratings`,
            data: rating,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'yellow',
            borderColor:'blue'
        }]
    };
    const data2 = {
        labels: tickets,
        datasets: [{
            label: `analytics for ${value} for resolution time in hours`,
            data: resolutionTime,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'yellow',
            borderColor:'blue'
        }]
    };
    const options = {
        plugins: {
            legend: true,

        },
        scales: {
            x:{
                grid:{
                    display:false
                }
            },
            y:{
                ticks:{
                    stepSize:1
                },
                grid:{
                    borderDash:[10]
                }
            }
        }
    }
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
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/v1/manager/generateAnalytics1/${id.agentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            credentials: 'include',
            body: JSON.stringify({"startDate": startDate ,"endDate":endDate} )
        })
        const data = await response.json()
        let ticks = data.analyticsDetails.ticketId
        console.log('setting tcikets ',setTickets(ticks))
        console.log('tickets',ticks)
        let rates = data.analyticsDetails.Rating
        setRating(rates.map((ratings)=>ratings))
        console.log('ratings',rating)
        let times = data.analyticsDetails.ResolutionTime
        setResolutionTime(times.map((time)=>time))
        console.log('times',resolutionTime)
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
         console.log("abo 7amada",data)
         let ticks = data.analyticsDetails.ticketId
         setTickets(ticks.map((ticket)=>ticket))

         console.log(tickets)
         let rates = data.analyticsDetails.Rating
         setRating(rates.map((ratings)=>ratings))

         console.log('ratings',rating)
         let times = data.analyticsDetails.ResolutionTime
         setResolutionTime(times.map((time)=>time))
         

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
         console.log(data.analyticsDetails)
         console.log(data.ticketId)
         console.log(data.timeframe)
         console.log(data.analyticsFor)
         console.log(data.analyticsDetails.ticketId)
         console.log([data.analyticsDetails.ticketId])
         let ticks = data.analyticsDetails.ticketId
         setTickets(ticks.map((ticket)=>ticket))
         console.log(tickets)
         let rates = data.analyticsDetails.Rating
         setRating(rates.map((ratings)=>ratings))
         console.log('ratings',rating)
         let times = data.analyticsDetails.ResolutionTime
         setResolutionTime(times.map((time)=>time))
     }catch (error) {
         console.log(error)
     }  
     }
    return(
        <div style={{ overflowY: 'auto', height: '100vh' }}>
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
      <>
      {showGenAnalysis && 
      <input type="text" 
        placeholder="End Date in yyyy-mm-dd" 
        class="input input-bordered w-full max-w-xs" 
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
/>} </>
      <>
        {showGenAnalysis &&  
        
        
<select onChange={handleChange} class="select select-bordered w-full max-w-xs">
  
  <option disabled selected>Generate analytics for</option>

  <option value="Agent">Agent</option>

  <option value="ticketCategory">ticket category</option>

  <option value="SubCategory">Sub-category</option>

</select>
}
<> 
        {value==='Agent' && <Agent onAdd={generateAnalyticsAgent}/> }
        
        {value==='ticketCategory' && <TicketCategory onAdd={generateAnalyticsCategory}/>}
       
        {value==='SubCategory' && <SubCategory onAdd={generateAnalyticsSubCategory} />}
        
        <div style={
    {
        width:'1000px',
        height:'300px',
        padding:'20px'
    }
  }> {value==='Agent' && 
        <Line data={data} options={options}/>        
    }
        {value==='Agent' && 
        <Line data={data2} options={options}/>        
    }
  {value==='ticketCategory' && 
        <Line data={data} options={options}/>        
    }
        {value==='ticketCategory' && 
        <Line data={data2} options={options}/>        
    }
    {value==='SubCategory' && 
        <Line data={data} options={options}/>        
    }
    
    {value==='SubCategory' && 
        <Line data={data2} options={options}/>        
    }
    </div>
        </>
      </>
      
        </div>

    )

}
export default Index