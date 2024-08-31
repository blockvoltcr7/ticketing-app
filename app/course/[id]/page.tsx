import { notFound } from 'next/navigation';


interface Props {
    params: {
        id: string;
    };
}


const SpecificCoursePage = ({ params }: Props) => {
    console.log(params.id);
    if(!parseInt(params.id)) {
        notFound();
    }
    return <div>Course Page {params.id}</div>;
};

export default SpecificCoursePage;