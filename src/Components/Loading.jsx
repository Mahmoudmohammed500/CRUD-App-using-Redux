import React from "react";

function Loading(props) {
    const { loading, error, children } = props;
    /* Hint >>
               When We rap Button Component into Loading Comonent On Add component
               Button become a child of the Loading component
               So We can access them using chidren props
          */

    //console.log("Children is =", children);

    // console.log("Element Type is =", children.type.render.displayName);
    // const elementType = children.type.render.displayName;




    const renderHandeller = () => {
        if (children && children.type && children.type.render && children.type.render.displayName) {
            const elementType = children.type.render.displayName;
            if (elementType === "Button") {
                const ButtonClone = React.cloneElement(
                    children,
                    { disabled: true },
                    "Loading..."
                );
                return (
                    <>
                        {
                            loading ?
                                (
                                    ButtonClone
                                )
                                :
                                error ? (
                                    <>
                                        {children}
                                        <p> <br></br> Server Error : {error} !</p>
                                    </>
                                )
                                    :
                                    (
                                        children
                                    )
                        }
                    </>
                );
            }
        }
        return (
            <>
                {
                    loading ? (
                        <p style={{ textAlign: "center" }}> Loading Please Wait.... </p>
                    )
                        : error ? (
                            <p style={{ textAlign: "center" }}> {error} </p>
                        )
                            :
                            (
                                children
                            )
                }
            </>
        );
    };
    return renderHandeller();
}
export default Loading;