// Making Protected Routes or Gaurds 
import { useSelector } from "react-redux";
const WithGaurd = (Component) => { // Component mean the children components >> as we make add and edit components children to WithGaurd function
    const Wrapper = (props) => { // Wrapper must start with captal letter
        const { islogedin } = useSelector(state => state.auth) //useSelector or any react hook can be only used within React function components or custom React Hooks.
        return   islogedin ? < Component {...props} /> : <h1 className="text-center">!Please Log In First</h1>
    }
    return Wrapper;
}
export default WithGaurd;

// WithGaurd.js is a higher order function we use it to handel show add or edit component if user is log in or no
// higher order function can take a function or component as a parameter 