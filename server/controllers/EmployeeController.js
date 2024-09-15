const { EmployeeModel } = require("../models/EmployeeModel");


//Create Employee
const createEmployee=async(req,res)=>{
   try{
    const body=req.body;
    body.image=req.file ? req.file?.path : null;
    console.log(body);
    const emp=new EmployeeModel(body)
    await emp.save();
    res.status(200).json({
        message:"Employee created",
        success:true
    })
   }catch(err){
    res.status(500).json({
        message:"Server Error",
        success:false,
        error:err
    })
   }
}

//UpdateOne Employee

const updateEmployeeById=async(req,res)=>{
   try{
    const {employeename,email,phone,designation,gender,course}=req.body;
    const {id} =req.params;
   
    let updateData={
        employeename,email,phone,designation,gender,course,updatedAt:new Date()
    }
    if(req.file){
        updateData.image=req.file.path;
    }

    const updateEmployee=await EmployeeModel.findByIdAndUpdate(
    id,
    updateData,
    {new:true}
    )
    if(!updateEmployee){
        return res.status(404).json({message:"Employee Not Found"})
    }

    res.status(201).json({
        message:"Employee Updated",
        success:true,
        data:updateEmployee
    })
   }catch(err){
    res.status(500).json({
        message:"Server Error",
        success:false,
        error:err
    })
   }
}



//GetAll Employee

const getAllEmployees=async(req,res)=>{
   try{
    let {page,limit,search}=req.query;

    page=parseInt(page) || 1;
    limit =parseInt(limit) || 5;

    const skip=(page-1)*limit;  

    let searchCriteria={};
    if(search){
        searchCriteria={
            employeename:{
                $regex:search,
                $options:'i'
            }
        }
    }

    const totolEmployess=await EmployeeModel.countDocuments(searchCriteria);

    const emps=await EmployeeModel.find(searchCriteria)
    .skip(skip)
    .limit(limit)
    .sort({updatedAt: -1})


    const totalpages=Math.ceil(totolEmployess / limit);


    res.status(200).json({
        message:"All Employee",
        success:true,
        data:{
            employees:emps,
            pagination:{
                totolEmployess,
                currentPage:page,
                totalpages,
                pageSize:limit
            }
        }
    })
   }catch(err){
    res.status(500).json({
        message:"Server Error",
        success:false,
        error:err
    })
   }
}

//GetOne Employee

const getEmployeeById=async(req,res)=>{
   try{
    const {id}=req.params
    const emp=await EmployeeModel.findOne({_id:id})
    res.status(200).json({
        message:"Get Employee Details",
        success:true,
        data:emp
    })
   }catch(err){
    res.status(500).json({
        message:"Server Error",
        success:false,
        error:err
    })
   }
}

//DeleteOne Employee

const deleteEmployeeById=async(req,res)=>{
   try{
    const {id}=req.params
    const emp=await EmployeeModel.findByIdAndDelete({_id:id})
    res.status(200).json({
        message:"Employee Deleted",
        success:true,
    })
   }catch(err){
    res.status(500).json({
        message:"Server Error",
        success:false,
        error:err
    })
   }
}



module.exports={createEmployee,getAllEmployees,getEmployeeById,deleteEmployeeById,updateEmployeeById}