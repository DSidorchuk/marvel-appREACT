import { useParams } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import SingleCharPage from "./SingleCharPage";

const CharPage = () => {

    const {charName} = useParams();

    return (
        <>
            <AppBanner/>
            <SingleCharPage charName={charName}/>
        </>
    )
}

export default CharPage;