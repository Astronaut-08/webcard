import os, dotenv
dotenv.load_dotenv()

from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec


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

# інформацію заповнюємо однією стрічкою, роздільном документа є два підряд абзаци
# для оптимального пошуку по метаданих варто притримуватись такого порядку надання інформації
# Тип документа (навички, умови), заголовок (Прямо так і вказуємо) і розгорнута інформація
# метадані та документи йдуть по порядку, якщо змінили перший документ оновіть перші петадані, якщо останній то останні
documents = '''
Навичка. Front-end розробка. HTML/CSS: семантична розмітка, стилізація, Flexbox, адаптивний дизайн, форми, таблиці, анімації.

Навичка. Front-end розробка. JavaScript: змінні, типи, функції, об’єкти, масиви, цикли, розгалуження, DOM, події, делегування, деструктуризація.

Навичка. Front-end розробка. TypeScript: базові типи, union/intersection, generics, interfaces, OOP, типізація коду.

Навичка. Front-end розробка. React: компоненти, props, state, форми, хуки, React Router, Redux, async Redux, оптимізація селекторів, code splitting.

Навичка. Мобільна розробка. React Native: дизайн-системи iOS/Android, UX/UI, навігація, API, state management, native modules, продуктивність, публікація в app stores.

Навичка. Full-stack розробка. Python: backend-розробка, асинхронність, HTTP server, SQLAlchemy, FastAPI, REST API, авторизація/аутентифікація, тестування.

Навичка. Full-stack розробка. Node.js: filesystem, event loop, streams, Express, form handling, upload files, Prisma ORM, WebSockets, Socket.IO, deployment.

Навичка. Full-stack розробка. Full-stack архітектура: RESTful API, база даних, робота з даними, API інтеграції, безпека, документація коду.

Навичка. Бази даних і системи даних. Relational DB: SQL, схемотехніка, ER-моделі, нормалізація, транзакції.

Навичка. Бази даних і системи даних. NoSQL: MongoDB, key-value, wide-column, графові DB, векторні DB, часові ряди, семантичний пошук.

Навичка. Бази даних і системи даних. Vector/graph data skills: рекомендаційні системи, знання графів, векторний пошук, аналітичні платформи.

Навичка. DevOps і інфраструктура. Linux: адміністрування, shell, системні основи.

Навичка. DevOps і інфраструктура. Docker, Kubernetes, Helm, Jenkins, ArgoCD, Terraform.

Навичка. DevOps і інфраструктура. CI/CD, monitoring (Prometheus, Grafana), database administration, DevSecOps/security in deployment.

Навичка. Алгоритми і математична база. Алгоритми: сортування, пошук, графи, дерева, heaps, greedy algorithms, dynamic programming, recursion.

Навичка. Алгоритми і математична база. Математика для CS: лінійна алгебра, аналітична геометрія, системи рівнянь, дискретна математика, диференціальне числення, оптимізація.

Навичка. Алгоритми і математична база. Чисельне програмування в Python: матричні розклади, інші методи, оптимізація, байєсівські методи.

Навичка. Machine Learning і Data Science. EDA, feature engineering, PCA, k-means, кластеризація, лінійна/логістична регресія, SVM, дерева рішень, ансамблі, крос-валідація, hyperparameter tuning, MLOps.

Навичка. Deep Learning і Computer Vision / NLP. Neuron networks, tensors, CNNs, transfer learning, embeddings, RNN/GRU/LSTM, attention, transformers, optimization, hyperparameter tuning, CV & NLP.

Навичка. Generative AI, LLM, agents. LLM architecture, prompt engineering, context engineering, LangChain, RAG, fine-tuning, agents, multi-agent systems, MCP/A2A, AI governance/regulation.

Навичка. Проєктна і дослідницька компетентність. Наукові публікації, власні проєкти, практичні задачі, експериментальна робота, документування, сценарії застосування технологій.

Умова співпраці. Remote / Hybrid. Без прив’язки до офісу: Роглядаю повністю віддалену роботу. 
У зв'язку з тим що проходжу службу в Збройних Силах України, відвідувати офіс у мене можливості не буде взагалі.

Умова співпраці. Remote / Hybrid. Часові зони, async-комунікація: Розгяладаю роботу з розбіжністю у часових зонах максимум до 4 годин.
Обов'язково має бути час на відпочинок, я орієнтуюсь на якісну роботу, а працювати 24/7 не гарантує якість.

Умова співпраці. B2B / Індивідуальний підприємець. Відносини з компанією, не найм: Розгляну відносини як підприємець.
Всю звітність і бухгалтерію яка залежить від моєї сторони опрацює мій бухгалтер.

Умова співпраці. Фріланс / контракт. Проєктна робота на певний термін: Можу взятись за певний проєкт і виконати його у визначений термін, 
без подальних зобов'язань. Також можу забезпечити короткострокову підтримку своїх проєктів, в разі багів або що, протягом 4 місяців.
Цього часу достаньо щоб виявити і виправити баги які будуть в продакшені.

Умова співпраці. Фріланс / контракт. Гнучкий графік, але без гарантії стабільності: Не можу ганатувати стабільного графіку у зв'язку зі своєю службою в Збройних Силах України.
Але гарантую що робота буде виконана якісно і на всі 100%.

Умова співпраці. Часткова зайнятість / Part-time. Комбінація роботи і іншого графіка: Розглядаю часткову зайнятість, щоб поєднювати зі службою в Збройних Силах України.

Умова співпраці. Партнерство/акційна модель. Відсоток від проєкту або equity: Можу взятись за цікавий стартап на партнерських умовах.
Не боюсь ризику, докладу максимуму, щоб стартап вийшов на глобальний рівень. 
'''.split('\n\n')

metadatas = [
    {
        'type': 'Навичка',
        'category': 'Front-end розробка',
        'title': 'HTML/CSS'
    },

    {
        'type': 'Навичка',
        'category': 'Front-end розробка',
        'title': 'JavaScript'
    },

    {
        'type': 'Навичка',
        'category': 'Front-end розробка',
        'title': 'TypeScript'
    },

    {
        'type': 'Навичка',
        'category': 'Front-end розробка',
        'title': 'React'
    },

    {
        'type': 'Навичка',
        'category': 'Мобільна розробка',
        'title': 'React Native'
    },

    {
        'type': 'Навичка',
        'category': 'Full-stack розробка',
        'title': 'Python'
    },

    {
        'type': 'Навичка',
        'category': 'Full-stack розробка',
        'title': 'Node.js'
    },

    {
        'type': 'Навичка',
        'category': 'Full-stack розробка',
        'title': 'Full-stack архітектура'
    },

    {
        'type': 'Навичка',
        'category': 'Бази даних і системи даних',
        'title': 'Relational DB'
    },

    {
        'type': 'Навичка',
        'category': 'Бази даних і системи даних',
        'title': 'NoSQL'
    },

    {
        'type': 'Навичка',
        'category': 'Бази даних і системи даних',
        'title': 'Vector/graph data skills'
    },

    {
        'type': 'Навичка',
        'category': 'DevOps і інфраструктура',
        'title': 'Linux'
    },

    {
        'type': 'Навичка',
        'category': 'DevOps і інфраструктура',
        'title': 'Docker'
    },

    {
        'type': 'Навичка',
        'category': 'DevOps і інфраструктура',
        'title': 'CI/CD'
    },

    {
        'type': 'Навичка',
        'category': 'Алгоритми і математична база',
        'title': 'Алгоритми'
    },

    {
        'type': 'Навичка',
        'category': 'Алгоритми і математична база',
        'title': 'Математика для CS'
    },

    {
        'type': 'Навичка',
        'category': 'Алгоритми і математична база',
        'title': 'Чисельне програмування в Python'
    },

    {
        'type': 'Навичка',
        'category': 'Machine Learning і Data Science',
        'title': 'EDA'
    },

    {
        'type': 'Навичка',
        'category': 'Deep Learning і Computer Vision / NLP',
        'title': 'Neuron networks'
    },

    {
        'type': 'Навичка',
        'category': 'Generative AI, LLM, agents',
        'title': 'LLM'
    },

    {
        'type': 'Навичка',
        'category': 'Проєктна і дослідницька компетентність',
        'title': 'Публікації'
    },

    {
        'type': 'Умова співпраці',
        'category': 'Remote / Hybrid',
        'title': 'Без прив’язки до офісу'
    },

    {
        'type': 'Умова співпраці',
        'category': 'Remote / Hybrid',
        'title': 'Часові зони, async-комунікація'
    },

    {
        'type': 'Умова співпраці',
        'category': 'B2B / Індивідуальний підприємець',
        'title': 'Відносини з компанією, не найм'
    },

    {
        'type': 'Умова співпраці',
        'category': 'Фріланс / контракт',
        'title': 'Проєктна робота на певний термін'
    },

    {
        'type': 'Умова співпраці',
        'category': 'Фріланс / контракт',
        'title': 'Гнучкий графік, але без гарантії стабільності'
    },

    {
        'type': 'Умова співпраці',
        'category': 'Часткова зайнятість / Part-time',
        'title': 'Комбінація роботи і іншого графіка'
    },

    {
        'type': 'Умова співпраці',
        'category': 'Партнерство/акційна модель',
        'title': 'Відсоток від проєкту або equity'
    }
]

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