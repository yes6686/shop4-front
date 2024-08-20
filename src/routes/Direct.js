import { useSelector } from "react-redux"

function Direct() {
    let userInfo = useSelector((state) => { return state.user})
    console.log(userInfo)

    return (
        <div style={{width :  "40%", textAlign : "left",  margin:'0 auto'}}>
            <br/>
            <h2>결제</h2>
            <hr style={{height : '3px', background : 'black'}}/>
            <br/>
            <h2>구매자 정보</h2>
            <hr/>
            <table style={{ margin:'0 auto', width : '100%'
            }}>
                <thead>
                    <tr>
                    <th>Number</th>
                    <th>Player</th>
                    <th>Position</th>
                    <th>Height</th>
                    <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>8</td>
                    <td>Marco Belinelli</td>
                    <td>G</td>
                    <td>6-5</td>
                    <td>195</td>
                    </tr>
                    <tr>
                    <td>5</td>
                    <td>Carlos Boozer</td>
                    <td>F</td>
                    <td>6-9</td>
                    <td>266</td>
                    </tr>
                    <tr>
                    <td>21</td>
                    <td>Jimmy Butler</td>
                    <td>G-F</td>
                    <td>6-7</td>
                    <td>220</td>
                    </tr>
                    <tr>
                    <td>9</td>
                    <td>Luol Deng</td>
                    <td>F</td>
                    <td>6-9</td>
                    <td>220</td>
                    </tr>
                    <tr>
                    <td>22</td>
                    <td>Taj Gibson</td>
                    <td>F</td>
                    <td>6-9</td>
                    <td>225</td>
                    </tr>
                    <tr>
                    <td>32</td>
                    <td>Richard Hamilton</td>
                    <td>G</td>
                    <td>6-7</td>
                    <td>193</td>
                    </tr>
                    <tr>
                    <td>12</td>
                    <td>Kirk Hinrich</td>
                    <td>G</td>
                    <td>6-4</td>
                    <td>190</td>
                    </tr>
                    <tr>
                    <td>48</td>
                    <td>Nazr Mohammed</td>
                    <td>C</td>
                    <td>6-10</td>
                    <td>250</td>
                    </tr>
                    <tr>
                    <td>13</td>
                    <td>Joakim Noah</td>
                    <td>C</td>
                    <td>6-11</td>
                    <td>232</td>
                    </tr>
                    <tr>
                    <td>77</td>
                    <td>Vladimir Radmanovic</td>
                    <td>F</td>
                    <td>6-10</td>
                    <td>235</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Nate Robinson</td>
                    <td>G</td>
                    <td>5-9</td>
                    <td>180</td>
                    </tr>
                    <tr>
                    <td>1</td>
                    <td>Derrick Rose</td>
                    <td>G</td>
                    <td>6-3</td>
                    <td>190</td>
                    </tr>
                    <tr>
                    <td>25</td>
                    <td>Marquis Teague</td>
                    <td>G</td>
                    <td>6-2</td>
                    <td>190</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


export default Direct