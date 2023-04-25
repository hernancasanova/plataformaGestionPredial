public class Animal{
    String name = "perro";
    public void showName(){
    	System.out.println("el nombre del animal es: "+this.name);
    }
    public static void main(String[] args) {
		Animal animal = new Animal();
		animal.showName();
	}
}
