
import { useImmer } from "use-immer";
export default function Tugas() {
    let [nama, setNama] = useImmer(null)
    let [list, setList] = useImmer([])

    function Inputvalue(e) {
        setNama(e.target.value)
    }
    function Isi(e) {
        setList((list)=>{
            list.push(nama)
        })
        setNama("")
    }
    return(
        <div>
            <input type="text" placeholder="Masukan nama" value={nama} onChange={Inputvalue} />
            <button onClick={Isi}>Tambah nama</button>
            <table>
                <tbody>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                    </tr>
                    {list.map((nama,index)=>(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{nama}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}