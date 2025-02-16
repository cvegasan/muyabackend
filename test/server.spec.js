import request from 'supertest';
import server  from '../server';

// Antes de todas las pruebas, inicias el servidor
const serverInstance = server;

// Después de todas las pruebas, cierra el servidor
afterAll(() => {
  serverInstance.close(); // Cierra el servidor para evitar que se mantenga abierto
});

describe('Operaciones CRUD', () => {
    it("GET /categoria - Retorna código 200 y un arreglo con al menos un objeto", async () => {
        const { body: categorias, statusCode } = await request(server)
          .get("/categorias")
          .send();

        expect(statusCode).toBe(200);
        expect(categorias).toBeInstanceOf(Array);
        expect(categorias.length).toBeGreaterThan(0);
        expect(categorias[0]).toBeInstanceOf(Object);
      });

    it('DELETE /categorias/:id - Retorna código 404 al intentar eliminar una categoria con un id que no existe', async () => {
      const jwt = 'token';
      const cat_id = 10;
      const { statusCode } = await request(server)
        .delete(`/categorias/${cat_id}`)
        .set('Authorization', jwt)
        .send();

      expect(statusCode).toBe(404);
    });

  it('POST /categorias - Retorna código 201 Al agregar una nueva categoria', async () => {
    const nuevaCategoria = {cat_nombre: 'Arriendo Maquinaria'}; //Ojo que la tabla tiene validacion UNIQUE en cat_nombre

    const response = await request(server)
      .post('/categorias')
      .send(nuevaCategoria)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toBe(201); // Verifica que el código de estado sea 201

    // Si la respuesta no es un arreglo, verifica directamente el objeto
  expect(response.body).toMatchObject({ cat_nombre: nuevaCategoria.cat_nombre });

  console.log('Categoría agregada:', response.body);
  });

  it('PUT /categorias/:id - Retorna código 404 si el id a actualizar no coincide', async () => {
    const categoriaActualizada = {cat_nombre: 'Arriendo Maquinaria'};
    const response = await request(server).put('/categorias/5').send(categoriaActualizada);
    expect(response.status).toBe(404);
  });
});
