// import TugasForm from "./TugasForm";
// import TugasSiswa from "./TugasSiswa";
// import { useImmerReducer } from "use-immer";

// let id = 0;

// const initialData =[
//    {id:id++, nama: 'Kengo', kelas: '10A', umur: 15, done:false}, 
//    {id:id++, nama: 'Akito', kelas: '10B', umur: 15, done:false},
//    {id:id++, nama: 'Yuna', kelas: '10C', umur: 15, done:true}, 
// ];

// function dataReducer(data, action) {
//     if (action.type === "ADD_DATA") {
//         data.push({
//             id: id++,
//             nama: action.nama,
//             kelas: action.kelas,
//             umur: action.umur,
//             done: false
//         })
//     } else if (action.type === "CHANGE_DATA") {
//         const index = data.cariIndex(data => data.id === action.id)
//         data[index].nama = action.nama
//         data[index].kelas = action.kelas
//         data[index].umur = action.umur
//         data[index].done = action.done
//     } else if (action.type === "DELETE_DATA") {
//         const index = data.cariIndex(data => data.id === action.id)
//         data.splice(index, 1)
// }}

// export default function TugasApp(){
//     const [datas,dispatch]= useImmerReducer(dataReducer, initialData);
    
//     function handleAddData(nama, kelas, umur){
//         dispatch({
//             type: "ADD_DATA",
//             nama: nama,
//             kelas: kelas,
//             umur: umur
//         })
//     }
//     function handleChangeData(data){
//         dispatch({
//             type: "CHANGE_DATA",
//             id: data.id,
//             nama: data.nama,
//             kelas: data.kelas,
//             umur: data.umur,
//             done: data.done
//         })

//     }
//     function handleDeleteData(data){
//         dispatch({
//             type: "DELETE_DATA",
//             id: data.id
//         })
//     }
//     return(
//         <div>
//             <h1>DATA SISWA APP</h1>
//             <TugasForm onAddData={handleAddData}/>
//             <TugasSiswa datas={datas} onChange={handleChangeData} onDelete={handleDeleteData}/>
//         </div>
//     )
// }
import React, { useState } from "react";
import { useImmerReducer } from "use-immer";

const initialState = {
  students: []
};

function reducer(draft, action) {
  switch (action.type) {
    case "ADD_DATA":
      draft.students.push(action.masukin);
      break;

    case "DELETE_DATA":
      draft.students = draft.students.filter(
        (student) => student.id !== action.masukin
      );
      break;

    case "EDIT_DATA":
      const student = draft.students.find(
        (s) => s.id === action.masukin.id
      );
      if (student) {
        student.nama = action.masukin.nama;
        student.umur = action.masukin.umur;
        student.kelas = action.masukin.kelas;
      }
      break;

    default:
      break;
  }
}

export default function ManajemenSiswa() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const [form, setForm] = useState({
    id: null,
    nama: "",
    umur: "",
    kelas: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.nama || !form.umur || !form.kelas) return;

    if (isEditing) {
      dispatch({
        type: "EDIT_DATA",
        masukin: form
      });
      setIsEditing(false);
    } else {
      dispatch({
        type: "ADD_DATA",
        masukin: {
          ...form,
          id: Date.now()
        }
      });
    }

    setForm({
      id: null,
      nama: "",
      umur: "",
      kelas: ""
    });
  }

  function handleEdit(student) {
    setForm(student);
    setIsEditing(true);
  }

  return (
    <div>
      <h2>Manajemen Data Siswa</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
        />
        <input
          name="umur"
          type="number"
          placeholder="Umur"
          value={form.umur}
          onChange={handleChange}
        />
        <input
          name="kelas"
          placeholder="Kelas"
          value={form.kelas}
          onChange={handleChange}
        />
        <button type="submit">
          {isEditing ? "Update" : "Tambah"}
        </button>
      </form>

      <hr />

      <table border="1">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Umur</th>
            <th>Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {state.students.map((student) => (
            <tr key={student.id}>
              <td>{student.nama}</td>
              <td>{student.umur}</td>
              <td>{student.kelas}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "DELETE_DATA",
                      masukin: student.id
                    })
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {state.students.length === 0 && (
            <tr>
              <td colSpan="4">Belum ada data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
