import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          {/* <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} /> */}
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal(true)}>Add new cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <div>
//             <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
