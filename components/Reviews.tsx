
import Star from "./Star";

type Review = {
    user: { first_name: string,last_name: string }; // Updated to reflect the actual structure
    comment: string;
    rating: number;
    createdAt: string;
};
export default  function review({ data }: { data: Review[] }){
      return (
          <>
        <div className="flex justify-between  my-8">
        <div className="columns-auto">
        <h2 className="text-3xl text-black font-bold  ">
          All Reviews({data.length})
        </h2>
        </div>
   
        </div>      
        {data.length === 0 ? (
            <p className="flex justify-self-center  text-gray-500 my-20">
                Empty.
            </p>
            ) : (
            <div className="grid grid-flow-col gap-4">
           { data.map((review, index) => (           
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col h-full border">
                <div className="flex text-yellow-500 text-lg mb-4">
                    <Star star={review.rating} />
                </div>
                <div className="flex items-center mb-2">
                                <h3 className="flex space-x-2 text-lg font-bold text-black">
                                <span className="text-black">{review.user.first_name}</span>
                                <span className="text-black">{review.user.last_name}</span>
                                </h3>
                                {review.user.first_name && (
                                    <span className="ml-2 bg-green-500 text-xs rounded-full px-1">
                                        ✔
                                    </span>
                                )}
                            </div>
                <p className="text-gray-600 text-sm">{review.comment}</p><br/>
                <p className="text-gray-600 text-sm">{review.createdAt}</p>
                </div>
            ))}
         </div>   
         )} 
    </>
    )
}