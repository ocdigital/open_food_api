import { Client } from '@elastic/elasticsearch';

const esClient = new Client({ node: process.env.ELASTICSEARCH_URL });

export async function createProductIndex() {
    try {
        const indexExistsResponse = await esClient.indices.exists({ index: 'products' });

        if (!indexExistsResponse) {
            await esClient.indices.create({
                index: 'products',
                body: {
                    mappings: {
                        properties: {
                            code: { type: 'keyword' },
                            status: { type: 'keyword' },
                            imported_t: { type: 'date' },
                            url: { type: 'text' },
                            creator: { type: 'text' },
                            created_t: { type: 'date' },
                            last_modified_t: { type: 'date' },
                            product_name: { type: 'text' },
                            quantity: { type: 'text' },
                            brands: { type: 'text' },
                            categories: { type: 'text' },
                            labels: { type: 'text' },
                            cities: { type: 'text' },
                            purchase_places: { type: 'text' },
                            stores: { type: 'text' },
                            ingredients_text: { type: 'text' },
                            traces: { type: 'text' },
                            serving_size: { type: 'text' },
                            serving_quantity: { type: 'integer' },
                            nutriscore_score: { type: 'integer' },
                            nutriscore_grade: { type: 'keyword' },
                            main_category: { type: 'keyword' },
                            image_url: { type: 'text' }
                        }
                    }
                }
            });
            console.log('Index created');
        } else {
            console.log('Index already exists');
        }
    } catch (error) {
        console.error('Error creating index:', error);
    }
}
