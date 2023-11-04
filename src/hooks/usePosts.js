import axios from 'axios'
import { ref, onMounted } from 'vue'

export default function fetchJsonplaceholderPosts(limit) {
    const posts = ref([])
    // const page = ref(0)
    const totalPages = ref(0)
    const isPostLoading = ref(true)
    const fetching = async () => {
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/posts',
                {
                    params: {
                        _page: 1,
                        _limit: limit,
                    },
                },
            )

            totalPages.value = Math.ceil(
                response.headers['x-total-count'] / limit,
            )
            posts.value = response.data
            console.log(response.data)
        } catch (e) {
            console.log(e)
        } finally {
            isPostLoading.value = false
        }
    }
    onMounted(fetching)
    return {
        posts,
        // page,
        totalPages,
        isPostLoading,
    }
}
