import { useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  1단계 : 기존 컴포넌트 함수를 화살표 함수 형식으로 변경
  2단계 : 해당 컴포넌트 함수를 forwardRef()의 콜백으로 전달
  3단계 : 콜백으로 전달한 함수의 두번째 파라미터로 ref를 추가

  기본적으로 react는 단방향 데이터 바인딩 (부모 -> 자식)
  자식에서 부모로 데이터를 전달하려면 부모에서 자식 컴포넌트를 useRef로 참조
  자식에서 리턴되는 값이 있어야 부모에서 자식 컴포넌트를 참조 가능
  forwardRef()는 자식 JSX 요소를 ref에 담아서 부모요소로 리턴 가능
  만약 내보내는 값이 JSX가 아닌 특정 커스텀 객체일 때는 useImperativeHandle를 사용해야한다.
  사용방법은 위 단계와 동일
*/

const Popup = forwardRef((props, ref) => {
  const [Open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
    };
  });

  return (
    <AnimatePresence>
      {Open && (
        <motion.aside
          className="pop"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
          exit={{
            opacity: 0,
            scale: 0,
            transition: { duration: 0.5, delay: 1 },
          }}
        >
          <motion.div
            className="con"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
          >
            {props.children}
            <motion.span
              className="close"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, delay: 1 },
              }}
              exit={{
                opacity: 0,
                x: 50,
              }}
            >
              close
            </motion.span>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
});

// const Popup = (props) => {
//   return (
//     <aside className="pop">
//       <div className="con">
//         {props.children}
//         <span
//           className="close"
//           onClick={() => {
//             props.setOpen(false);
//           }}
//         >
//           close
//         </span>
//       </div>
//     </aside>
//   );
// };

export default Popup;
