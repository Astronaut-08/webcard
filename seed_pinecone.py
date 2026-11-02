import os, dotenv
dotenv.load_dotenv()

from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec

from info import documents, metadatas


client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY'),
    base_url='https://openrouter.ai/api/v1',
    default_headers={
        'HTTP-Referer': 'https://volodymyr-yusyp.pp.ua',
        'X-Title': 'WebCard Portfolio',
    }
)

pc = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))
index_name = os.getenv('PINECONE_INDEX_NAME', 'portfolio-index')

# Перевіряємо, чи існує індекс із такою назвою
existing_indexes = [index_info['name'] for index_info in pc.list_indexes()]

if index_name not in existing_indexes:
    print(f"Індекс '{index_name}' не знайдено. Створюємо новий...")
    
    pc.create_index(
        name=index_name,
        dimension=1536,  # Обов'язково 1536 для text-embedding-3-small
        metric="cosine", # Метрика схожості (найкраще підходить для семантичного пошуку)
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1" # Оберіть регіон, який вам підходить (наприклад, us-east-1)
        )
    )
    print(f"✅ Індекс '{index_name}' успішно створено!")
else:
    print(f"ℹ️ Індекс '{index_name}' вже існує.")

index = pc.index(index_name)

# Підготовка даних до завантаження в Pinecone
vectors_to_upsert = []

for i, doc in enumerate(documents):
    response = client.embeddings.create(
        model='openai/text-embedding-3-small',
        input=doc
    )
    vector_values = response.data[0].embedding

    # Формуємо пакет для pinecone
    vectors_to_upsert.append({
        'id': f'doc_{i+1:3}',
        'values': vector_values,
        'metadata': {
            **metadatas[i],
            'text': doc
        }
    })

# Завантаження в Pinecone
index.upsert(vectors=vectors_to_upsert)
print(f"✅ Успішно завантажено {len(vectors_to_upsert)} документів у Pinecone!")