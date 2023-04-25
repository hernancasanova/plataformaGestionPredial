public class Animal{
	public static void main(String[] args) {
		Animal animal = new Animal();
		animal.showName();
	}
    String name = "perro";
    void showName(){
    	System.out.println("el nombre del animal es: ",this.name);
    }
}
