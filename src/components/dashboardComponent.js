// react bootstrap imports
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';

// other packages imports
import axios from 'axios';

// hooks imports
import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';

// other file imports
import { authname, authtoken, authemail } from "../authDetails"
import { apiurl } from '../apiurl';

// dashboard component
export function Dashboard() {

    const history = useHistory();
    const updateplans = [

        {
            planName: "Gold",
            price: "Rs:500",
            validity: "6 months",
            benifits: "Contains adds,Enjoy audio in High quality,Download option is not available"
        },
        {
            planName: "Diamond",
            price: "Rs:1000",
            validity: "9 months",
            benifits: "Add free music,Enjoy High defention audio,Download to listen offline music"
        },
        {
            planName: "Platinum",
            price: "Rs:1500",
            validity: "1 year",
            benifits: "Add free music,Enjoy High defention audio,Download to listen offline music"
        }
    ];
    const [value, setvalue] = useState();
    console.log(value)

const[truevalue,settruevalue]=useState("false");

    const userDetailsReq = () => {
        const auth = {
            token: authtoken,
            emailid: authemail
        }
        axios({ url: `${apiurl}/fetch`, method: "GET", headers: auth })
            .then((response) => {
                setvalue(response.data)
            })
    }
    if (updateplans !== undefined) {

}

    useEffect(userDetailsReq, [])

// if()
        const updatePlan = (value) => {
            const auth = {
                token: authtoken,
                emailid: authemail
            }
            const datas = {
                newplan: value
            }
            console.log(datas)
            axios({ url: `${apiurl}/plan`, method: "POST", headers: auth, data: datas })
                .then((response) => {
                    console.log(response.data)
                    setvalue(response.data)
                })
                .then(() =>{history.push("/dashboard")} )
        }

        return (
            <div>
                <div className="dashboard-container-part1">
                    <Card className='dashboard-container-part1-card'>
                        <Card.Body className='dashboard-container-part1-cardbody'>
                            <h1>Welcome back {authname},Have an nice day ????</h1>
                            {(value===undefined)?null:<h3>Your current plan is :{value.plan}</h3>}
                            
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    {updateplans.map(({ planName, validity, benifits, price }) =>
                        <div className="dashboard-container-part2" key={planName}>
                            <Card >
                                <Card.Body className='dashboard-container-part2-cardbody'>
                                    <h1>Plan :{planName}</h1>
                                    <h4>Validity:{validity}</h4>
                                    <h5>Benifits:{benifits}</h5>
                                    <h3>Price:{price}</h3>
                                    <Button onClick={() => settruevalue("true")} variant="primary">Buy now</Button>
                                </Card.Body>
                            </Card>
                        </div>)}
                </div>


            </div>

        )
    }