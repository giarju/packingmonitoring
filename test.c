//启动过程ONS Startup process ONS
if Route.Start and not Route.ONS.0 then
   Route.Start_Temp :=1; //初始启动中间位 Initial start midpoint
   Route.Source_Priority := 1;//源指针初始化为1 The source pointer is initialized to 1
   Route.Destination_Priority :=1;//源指针初始化为1 
   Route.Start_Temp2 :=1;//作为源仓启动中间位 As the starting midpoint of the source warehouse
   Route.Stop :=0;
   Route.Stoped :=0;
   Route.Source_Stop_Prompt :=0;
   Route.Destination_Stop_Prompt :=0;
end_if;
Route.ONS.0 := Route.Start;

//停止过程ONS Stop process ONS
if Route.Stop  then
   Route.Start :=0;//复位启动 Reset start
   Route.Source_Priority := 0;//源指针为0 Source pointer is 0
   Route.Destination_Priority :=0;//目的指针为0 Destination pointer is 0
   //Route.ActualSource:=0; //实际源仓清零 The actual source warehouse is cleared
   //Route.ActualDestination:=0;//实际目的仓清零 The actual purpose warehouse is cleared
   Route.NextSource_Stop_CMD :=0;   
   Route.NextSource_Stop_Done:=0;
   Route.NextDestination_Stop_CMD :=0;
   Route.NextDestination_Stop_Done:=0;
   Route.Start_Temp :=0;
   Route.Start_Temp2 :=0;
   Route.Source_Stop_Prompt :=0;
   Route.Destination_Stop_Prompt :=0;
end_if;
//Route.ONS.1 := Route.Stop;
 
if Route.Stoped then
   For I := 0 to 9 do   //源目标仓清除 Source and target bin clear
       Route.Source[I] := 0;
       Route.Destination[I] :=0;
   End_For;
   Route.ActualSource:=0; //实际源仓清零 The actual source warehouse is cleared
   Route.ActualDestination:=0;//实际目的仓清零 The actual purpose warehouse is cleared
   //Route.Stoped :=0;
end_if;


//动行中 On the move
IF Route.Start THEN
   Route.Busy :=1;//使用中标识 Sign in use
   Route.ActualSource :=Route.Source[Route.Source_Priority];
   Route.ActualDestination :=Route.Destination[Route.Destination_Priority];
   if Route.Source_Priority >4 then
      Route.Source_Priority :=1;
   end_if;
   if Route.Destination_Priority >4 then
      Route.Destination_Priority :=1;
   end_if;

   //源或目的仓地址为0时自动到下一个仓 When the source or destination bin address is 0, it will automatically go to the next bin
   if Route.Source[Route.Source_Priority]=0 and Route.SourceControlEnable then
      if Route.Source_Priority<4 then
         Route.Source_Priority :=Route.Source_Priority+1;
	  end_if;
   end_if;
   if Route.Destination[Route.Destination_Priority]=0  and Route.DestinationControlEnable then
      if Route.Destination_Priority<4 then
         Route.Destination_Priority :=Route.Destination_Priority+1;
	  end_if;
   end_if; 
   //使能仓间循环 Enable cycle between bins
   //源 source  
   if Route.Source_Cycle  and (Route.Source_Priority>3) and Route.SourceControlEnable  then
      Route.Source_Priority:=1;
   end_if;
   if not Route.Source_Cycle and (Route.Source_Priority>3) and Route.SourceControlEnable  and not Route.ONS.2 then
      Route.Source_Stop_Prompt :=1;
     // Route.Stop:=1;
   end_if;
   Route.ONS.2 := not Route.Source_Cycle and (Route.Source_Priority>3) and Route.SourceControlEnable ;

   //目的 Purpose
   if Route.Destination_Cycle  and (Route.Destination_Priority>3) and Route.DestinationControlEnable  then
      Route.Destination_Priority:=1;
   end_if;
   if not Route.Destination_Cycle and (Route.Destination_Priority>3) and Route.DestinationControlEnable and not Route.ONS.3 then
      Route.Destination_Stop_Prompt :=1;
      //Route.Stop:=1;
   end_if;  
    Route.ONS.3 := not Route.Destination_Cycle and (Route.Destination_Priority>3) and Route.DestinationControlEnable ;
	 
END_IF ;
//停止 stop
IF Route.Stop THEN
   Route.Busy :=0;
END_IF;


//源仓换仓控制 Source warehouse swap control
if Route.Start and( Route.Empty or Route.NextSource) and (Route.Source_Priority>0) and not Route.NextSource_Stop_CMD  and Route.SourceControlEnable then
   if Route.Source_Priority<4 then
   Route.Source_Priority:=Route.Source_Priority+1;
   end_if;
   Route.NextSource_Stop_CMD :=1;
end_if;
if Route.Start and Route.NextSource_Stop_CMD and Route.NextSource_Stop_Done and Route.SourceControlEnable then
   Route.NextSource_Stop_CMD :=0;
   Route.Start_Temp2 :=1;
   Route.NextSource_Stop_Done:=0;
end_if;

//目的仓换仓控制 Target warehouse swap control
if Route.Start and( Route.Full or Route.NextDestination) and (Route.Destination_Priority>0) and not Route.NextDestination_Stop_CMD and Route.DestinationControlEnable then
   if Route.Destination_Priority<4 then
   Route.Destination_Priority:=Route.Destination_Priority+1;
   end_if;
   Route.NextDestination_Stop_CMD :=1;
end_if;
if Route.Start and Route.NextDestination_Stop_CMD and Route.NextDestination_Stop_Done and Route.DestinationControlEnable then
   Route.NextDestination_Stop_CMD :=0;
   Route.Start_Temp :=1;
   Route.NextDestination_Stop_Done:=0;
end_if;

//如果功能不使能，清零！ If the function is not enabled, clear it!
if not Route.SourceControlEnable then
   Route.ActualSource :=0;
end_if;
if not Route.DestinationControlEnable then
   Route.ActualDestination :=0;
end_if;
