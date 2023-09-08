export default function usePostStore() {
    async function getAllPosts(query?: IGetAllPost.Query) {
        const res = await executeRequest<IGetAllPost.Data>(`/post`, { method: "GET", query });
        return res.data;
    }

    async function getOnePost(id: string) {
        const res = await executeRequest<IGetOnePost.Data>(`/post/${id}`, { method: "GET" });
        return res.data;
    }

    async function getTags() {
        const res = await executeRequest<IGetTags.Data>(`/post/tags`, { method: "GET" });
        return res.data;
    }

    async function createPost(body: ICreatePost.Body) {
        const formData = new FormData();
        formData.append("content", body.content);
        body.tags.forEach((tag) => formData.append("tags[]", tag));
        if (body.image) formData.append("image", body.image);
        if (body.link) {
            formData.append("link.id", body.link.id);
            formData.append("link.name", body.link.name);
            formData.append("link.banner", body.link.banner);
            formData.append("link.url", body.link.url);
        }

        const res = await executeRequest<ICreatePost.Data>(`/post`, { method: "POST", body: formData });
        return res;
    }

    async function updatePost(id: string, body: IUpdatePost.Body) {
        const formData = new FormData();
        formData.append("content", body.content);
        body.tags.forEach((tag) => formData.append("tags[]", tag));
        if (body.image) formData.append("image", body.image);
        if (body.link) {
            formData.append("link.id", body.link.id);
            formData.append("link.name", body.link.name);
            formData.append("link.banner", body.link.banner);
            formData.append("link.url", body.link.url);
        }

        const res = await executeRequest<IUpdatePost.Data>(`/post/${id}`, { method: "PUT", body: formData });
        return res;
    }

    async function deletePost(id: string) {
        const res = await executeRequest<IDeletePost.Data>(`/post/${id}`, { method: "DELETE" });
        return res;
    }

    async function likePost(id: string) {
        const res = await executeRequest<IDeletePost.Data>(`/post/${id}/like`, { method: "PATCH" });
        return res;
    }

    async function createComment(id: string, body: ICreateComment.Body) {
        const res = await executeRequest<ICreateComment.Data>(`/post/${id}/comment`, { method: "POST", body });
        return res;
    }

    async function getOneComment(post_id: string, id: string) {
        const res = await executeRequest<IGetOneComment.Data>(`/post/${post_id}/comment/${id}`, { method: "GET" });
        return res.data;
    }

    async function updateComment(post_id: string, id: string, body: IUpdateComment.Body) {
        const res = await executeRequest<IUpdateComment.Data>(`/post/${post_id}/comment/${id}`, {
            method: "PUT",
            body,
        });
        return res;
    }

    async function deleteComment(post_id: string, id: string) {
        const res = await executeRequest<IDeleteComment.Data>(`/post/${post_id}/comment/${id}`, {
            method: "DELETE",
        });
        return res;
    }

    async function likeComment(post_id: string, id: string) {
        const res = await executeRequest<IDeleteComment.Data>(`/post/${post_id}/comment/${id}/like`, {
            method: "PATCH",
        });
        return res;
    }

    async function reportPost(id: string, body: IReportPost.Body) {
        const res = await executeRequest<IReportPost.Data>(`/post/${id}/report`, {
            method: "PATCH",
            body,
        });
        return res;
    }

    return {
        getAllPosts,
        getOnePost,
        getTags,
        createPost,
        updatePost,
        deletePost,
        likePost,
        createComment,
        updateComment,
        deleteComment,
        getOneComment,
        likeComment,
        reportPost,
    };
}
