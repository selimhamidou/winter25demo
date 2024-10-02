public class Winter25Functionalities {
    public static void returnSOQL(String mySOQL){
         system.debug(database.query(mySOQL));
    }
}